import path from 'path';
import { readFileIfExists, checkFileExists, getLanguageFromPath } from '../utils/file-utils.js';
import { STANDARD_SHOPIFY_EXTENSION_TEMPLATE, STANDARD_PACKAGE_JSON_TEMPLATE } from '../templates/standard-templates.js';

export async function analyzeShopifyExtension(entry, analysis) {
  const content = await readFileIfExists(entry);
  if (!content) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Unable to read shopify.extension.toml.liquid file'
    });
    return;
  }

  const functionDir = path.dirname(entry);
  const language = getLanguageFromPath(entry);

  // Check for package.json.liquid in JavaScript functions
  if (language === 'javascript') {
    const packageJsonPath = path.join(functionDir, 'package.json.liquid');
    const packageJsonContent = await readFileIfExists(packageJsonPath);
    
    if (!packageJsonContent) {
      analysis.inconsistencies.push({
        file: packageJsonPath,
        issue: 'Missing required package.json.liquid file for JavaScript function',
        fix: 'Create package.json.liquid with the standard template'
      });
    } else {
      // Normalize both files by removing whitespace and replacing Liquid variables
      const normalizeContent = (content) => {
        return JSON.stringify(
          JSON.parse(
            content
              .replace(/\s+/g, ' ')
              .replace(/{{.*?}}/g, "placeholder")
          )
        );
      };

      try {
        const normalizedActual = normalizeContent(packageJsonContent);
        const normalizedExpected = normalizeContent(STANDARD_PACKAGE_JSON_TEMPLATE);

        if (normalizedActual !== normalizedExpected) {
          analysis.inconsistencies.push({
            file: packageJsonPath,
            issue: 'package.json.liquid does not match the standard template',
            fix: 'Replace the contents with the standard template'
          });
        }
      } catch (error) {
        analysis.inconsistencies.push({
          file: packageJsonPath,
          issue: 'Invalid JSON in package.json.liquid',
          fix: 'Fix the JSON syntax in package.json.liquid'
        });
      }
    }
  }

  // Check for type = "function"
  if (!content.includes('type = "function"')) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Missing or incorrect type declaration',
      expected: 'type = "function"',
      fix: 'Add or correct the type declaration to: type = "function"'
    });
  }

  // Check for uid conditional
  const uidPattern = /{%\s*if\s+uid\s*%}uid\s*=\s*"{{[\s\w]*uid[\s\w]*}}"{%\s*endif\s*%}/;
  if (!uidPattern.test(content)) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Missing or incorrect uid conditional',
      expected: '{% if uid %}uid = "{{ uid }}"{% endif %}',
      fix: 'Add the uid conditional with the correct format'
    });
  }

  // Check for [[extensions]] section
  if (!content.includes('[[extensions]]')) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Missing [[extensions]] section',
      fix: 'Add the [[extensions]] section before any targeting sections'
    });
  }

  // Check for [[extensions.targeting]] section
  if (!content.includes('[[extensions.targeting]]')) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Missing [[extensions.targeting]] section',
      fix: 'Add at least one [[extensions.targeting]] section'
    });
  }

  // Check section order
  const extensionsIndex = content.indexOf('[[extensions]]');
  const targetingIndex = content.indexOf('[[extensions.targeting]]');
  
  if (extensionsIndex !== -1 && targetingIndex !== -1 && extensionsIndex > targetingIndex) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Incorrect section order',
      fix: 'Move [[extensions]] section before [[extensions.targeting]] section'
    });
  }

  // Check for any GraphQL query references
  const queryMatches = content.match(/input_query\s*=\s*"([^"]+)"/g) || [];
  for (const match of queryMatches) {
    const queryPath = match.split('"')[1];
    const queryPathWithLiquid = `${queryPath}.liquid`;
    const fullPath = path.join(functionDir, queryPathWithLiquid);
    
    const hasQueryFile = await checkFileExists(fullPath);
    if (!hasQueryFile) {
      analysis.inconsistencies.push({
        file: fullPath,
        issue: 'Missing GraphQL query file',
        fix: `Create the GraphQL query file at ${queryPathWithLiquid}`
      });
    }
  }
} 