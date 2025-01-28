import path from 'path';
import { readFileIfExists, checkFileExists } from '../utils/file-utils.js';

const STANDARD_LOCALE_TEMPLATE = `{
  "name": "{{name}}",
  "description": "{{name}}"
}`;

export async function analyzeLocales(functionDir, analysis) {
  const localesDir = path.join(functionDir, 'locales');
  const defaultLocalePath = path.join(localesDir, 'en.default.json.liquid');

  // Check for locales directory
  const hasLocalesDir = await checkFileExists(localesDir);
  if (!hasLocalesDir) {
    analysis.inconsistencies.push({
      file: localesDir,
      issue: 'Missing required locales directory'
    });
    return;
  }

  // Check for en.default.json.liquid
  const localeContent = await readFileIfExists(defaultLocalePath);
  if (!localeContent) {
    analysis.inconsistencies.push({
      file: defaultLocalePath,
      issue: 'Missing required en.default.json.liquid file'
    });
    return;
  }

  // Validate locale content
  try {
    const parsedContent = JSON.parse(localeContent.replace(/\{\{.*?\}\}/g, '{{name}}'));
    const expectedContent = JSON.parse(STANDARD_LOCALE_TEMPLATE);

    // Check for required keys
    for (const key of Object.keys(expectedContent)) {
      if (!parsedContent.hasOwnProperty(key)) {
        analysis.inconsistencies.push({
          file: defaultLocalePath,
          issue: `Missing required key "${key}" in locale file`,
          expected: `"${key}": "{{name}}"`,
          fix: `Add the missing "${key}" field with value "{{name}}"`
        });
      }
    }

    // Check for extra keys
    for (const key of Object.keys(parsedContent)) {
      if (!expectedContent.hasOwnProperty(key)) {
        analysis.inconsistencies.push({
          file: defaultLocalePath,
          issue: `Extra key "${key}" found in locale file`,
          fix: `Remove the extra "${key}" field`
        });
      }
    }

    // Check template variable usage
    if (!localeContent.includes('{{name}}')) {
      analysis.inconsistencies.push({
        file: defaultLocalePath,
        issue: 'Missing or incorrect template variable usage',
        expected: 'Should use {{name}} for dynamic values',
        fix: 'Replace static values with {{name}}'
      });
    }
  } catch (error) {
    analysis.inconsistencies.push({
      file: defaultLocalePath,
      issue: 'Invalid JSON format in locale file',
      fix: 'Fix JSON syntax errors and ensure the file follows the standard template'
    });
  }
} 