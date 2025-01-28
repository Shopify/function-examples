import glob from 'fast-glob';
import { Liquid } from 'liquidjs';
import path from 'path';
import fs from 'node:fs/promises';
import toml from '@iarna/toml';

const STANDARD_TEMPLATE = `[package]
name = "{{handle | replace: " ", "-" | downcase}}"
version = "1.0.0"
edition = "2021"

[dependencies]
serde = { version = "1.0.13", features = ["derive"] }
serde_json = "1.0"
shopify_function = "0.8.1"
graphql_client = "0.14.0"

[profile.release]
lto = true
opt-level = 'z'
strip = true
`;

const STANDARD_MAIN_RS = `use std::process;
pub mod run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
`;

const STANDARD_SHOPIFY_EXTENSION_TEMPLATE = `api_version = "2025-01"

[[extensions]]
name = "t:name"
handle = "{{handle}}"
type = "function"
{% if uid %}uid = "{{ uid }}"{% endif %}

[extensions.ui.paths]
create = "/"
details = "/"
`;

const STANDARD_LOCALE_TEMPLATE = `{
  "name": "{{name}}",
  "description": "{{name}}"
}`;

const BUILD_CONFIGS = {
  rust: {
    command: 'cargo build --target=wasm32-wasip1 --release',
    path: 'target/wasm32-wasip1/release/{{handle | replace: "-", "_" | downcase}}.wasm',
    watch: '["src/**/*.rs"]'
  },
  javascript: {
    command: '',
    path: 'dist/function.wasm',
    watch: '["src/**/*"]'
  },
  wasm: {
    command: 'echo \'build the wasm\'',
    path: '',
    watch: '[]'
  }
};

async function checkMainRsModules(mainRsPath, content, analysis) {
  const srcDir = path.dirname(mainRsPath);
  const moduleLines = [];

  // Always include the standard imports
  moduleLines.push('use std::process;');

  // Check for run.rs (required)
  try {
    await fs.access(path.join(srcDir, 'run.rs'));
    moduleLines.push('pub mod run;');
  } catch (error) {
    analysis.inconsistencies.push({
      file: mainRsPath,
      issue: 'Missing required run.rs module'
    });
  }

  // Check for fetch.rs (optional)
  try {
    await fs.access(path.join(srcDir, 'fetch.rs'));
    moduleLines.push('pub mod fetch;');
  } catch (error) {
    // fetch.rs is optional, so we don't need to report it missing
  }

  // Add any other .rs files in the src directory (excluding main.rs)
  const srcFiles = await fs.readdir(srcDir);
  for (const file of srcFiles) {
    if (file.endsWith('.rs') && file !== 'main.rs' && file !== 'run.rs' && file !== 'fetch.rs') {
      const moduleName = file.replace('.rs', '');
      moduleLines.push(`pub mod ${moduleName};`);
    }
  }

  // Sort the module declarations for consistency
  moduleLines.sort();

  // Add the main function
  moduleLines.push('');  // Empty line for spacing
  moduleLines.push('fn main() {');
  moduleLines.push('    eprintln!("Please invoke a named export.");');
  moduleLines.push('    process::exit(1);');
  moduleLines.push('}');

  return moduleLines.join('\n');
}

async function checkFileAgainstTemplate(filePath, content, template, analysis, type = 'Cargo.toml') {
  if (type === 'main.rs') {
    // For main.rs, generate the expected content based on available modules
    template = await checkMainRsModules(filePath, content, analysis);
  }

  const fileLines = content.split('\n').map(line => line.trim()).filter(line => line);
  const templateLines = template.split('\n').map(line => line.trim()).filter(line => line);

  // Compare each line from the file against the template
  fileLines.forEach((line, index) => {
    // Skip empty lines and liquid template lines for Cargo.toml
    if (type === 'Cargo.toml' && (line.includes('{%') || line.includes('%}') || !line)) return;
    
    // Normalize the line for comparison (handle template variables) for Cargo.toml
    const normalizedLine = type === 'Cargo.toml' 
      ? line.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
      : line;
    
    // Find the corresponding line in the template
    const templateLine = templateLines.find(tLine => {
      if (type === 'Cargo.toml') {
        // If it's a section header, match exactly
        if (line.startsWith('[') && line.endsWith(']')) {
          return line === tLine;
        }
        // For other lines, match the key part (before =)
        const lineKey = line.split('=')[0]?.trim();
        const tLineKey = tLine.split('=')[0]?.trim();
        return lineKey === tLineKey;
      }
      // For main.rs, do exact matching
      return line === tLine;
    });

    if (!templateLine) {
      // For main.rs, check if it's a module declaration that should be there
      if (type === 'main.rs' && line.startsWith('pub mod ') && line.endsWith(';')) {
        const moduleName = line.slice(8, -1);
        const moduleFile = path.join(path.dirname(filePath), `${moduleName}.rs`);
        try {
          if (!fs.existsSync(moduleFile)) {
            analysis.lineDiscrepancies.push({
              file: filePath,
              line: line,
              issue: `Module declared but ${moduleName}.rs file not found`
            });
          }
        } catch (error) {
          // If we can't check the file, assume it's an issue
          analysis.lineDiscrepancies.push({
            file: filePath,
            line: line,
            issue: `Unable to verify module file: ${moduleName}.rs`
          });
        }
      } else {
        analysis.lineDiscrepancies.push({
          file: filePath,
          line: line,
          issue: 'Extra line not in template'
        });
      }
    } else if (normalizedLine !== templateLine) {
      analysis.lineDiscrepancies.push({
        file: filePath,
        line: line,
        expected: templateLine,
        issue: 'Line differs from template'
      });
    }
  });

  // Check for missing lines from template
  templateLines.forEach(templateLine => {
    const normalizedTemplateLine = type === 'Cargo.toml'
      ? templateLine.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
      : templateLine;
    
    const hasLine = fileLines.some(line => {
      const normalizedLine = type === 'Cargo.toml'
        ? line.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
        : line;
      return normalizedLine === normalizedTemplateLine;
    });

    if (!hasLine && (type !== 'Cargo.toml' || !templateLine.includes('{{'))) {
      analysis.lineDiscrepancies.push({
        file: filePath,
        expected: templateLine,
        issue: 'Missing line from template'
      });
    }
  });
}

async function analyzeShopifyExtensionToml(filePath, content, analysis) {
  const fileLines = content.split('\n').map(line => line.trim());
  const templateLines = STANDARD_SHOPIFY_EXTENSION_TEMPLATE.split('\n').map(line => line.trim());

  // Determine language based on path
  let language;
  if (filePath.includes('/rust/')) {
    language = 'rust';
  } else if (filePath.includes('/wasm/')) {
    language = 'wasm';
  } else {
    language = 'javascript';
  }
  const buildConfig = BUILD_CONFIGS[language];

  // Check required fields and sections
  const requiredFields = {
    'api_version =': 'api_version field',
    '[[extensions]]': 'extensions section',
    '[extensions.build]': 'extensions.build section',
    '[extensions.ui.paths]': 'extensions.ui.paths section'
  };
  
  Object.entries(requiredFields).forEach(([pattern, description]) => {
    const hasField = fileLines.some(line => line.trim().startsWith(pattern));
    if (!hasField) {
      analysis.inconsistencies.push({
        file: filePath,
        issue: `Missing required ${description}`
      });
    }
  });

  // Check for required type = "function"
  const typeField = fileLines.find(line => line.trim().startsWith('type ='));
  if (!typeField || !typeField.includes('"function"')) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Missing or incorrect type field. Should be: type = "function"'
    });
  }

  // Check for uid conditional
  const hasUidConditional = content.includes('{% if uid %}uid = "{{ uid }}"{% endif %}');
  if (!hasUidConditional) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Missing uid conditional: {% if uid %}uid = "{{ uid }}"{% endif %}'
    });
  }

  // Check for at least one [[extensions.targeting]] section
  const hasTargetingSection = content.includes('[[extensions.targeting]]');
  if (!hasTargetingSection) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Missing required [[extensions.targeting]] section'
    });
  }

  // Check that [[extensions]] comes before [[extensions.targeting]]
  const extensionsIndex = content.indexOf('[[extensions]]');
  const targetingIndex = content.indexOf('[[extensions.targeting]]');
  if (extensionsIndex === -1) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Missing required [[extensions]] section'
    });
  } else if (targetingIndex !== -1 && extensionsIndex > targetingIndex) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: '[[extensions]] section must come before [[extensions.targeting]] section'
    });
  }

  // Check api_version value
  const apiVersionLine = fileLines.find(line => line.trim().startsWith('api_version ='));
  if (apiVersionLine) {
    const version = apiVersionLine.split('=')[1].trim().replace(/"/g, '');
    const expectedVersion = '2025-01';
    if (version !== expectedVersion) {
      analysis.inconsistencies.push({
        file: filePath,
        issue: `Non-standard api_version. Expected: "${expectedVersion}", Found: "${version}"`
      });
    }
  }

  // Check build configuration
  fileLines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('command =')) {
      const command = trimmedLine
        .substring(trimmedLine.indexOf('=') + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      if (command !== buildConfig.command) {
        analysis.inconsistencies.push({
          file: filePath,
          issue: `Non-standard build command for ${language}. Expected: "${buildConfig.command}", Found: "${command}"`
        });
      }
    }
    if (trimmedLine.startsWith('path =')) {
      const path = trimmedLine
        .substring(trimmedLine.indexOf('=') + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      
      if (language === 'rust') {
        // For Rust, check if it's hardcoded or uses the correct template
        if (path.includes('.wasm') && !path.includes('{{')) {
          // Hardcoded path is fine
        } else {
          const validFormats = [
            '{{handle | replace: "-", "_" | downcase}}',
            '{{handle | replace: " ", "-" | downcase}}'
          ];
          if (!validFormats.some(format => path.includes(format))) {
            analysis.inconsistencies.push({
              file: filePath,
              issue: `Non-standard handle format in path. Should use one of: ${validFormats.join(' or ')}`
            });
          }
        }
      } else if (language === 'wasm') {
        // For wasm, path should be empty
        if (path !== buildConfig.path) {
          analysis.inconsistencies.push({
            file: filePath,
            issue: `Non-standard build path for wasm. Expected empty path, Found: "${path}"`
          });
        }
      } else {
        // For JavaScript, check exact path match
        if (path !== buildConfig.path) {
          analysis.inconsistencies.push({
            file: filePath,
            issue: `Non-standard build path for JavaScript. Expected: "${buildConfig.path}", Found: "${path}"`
          });
        }
      }
    }
    if (trimmedLine.startsWith('watch =')) {
      const watch = trimmedLine
        .substring(trimmedLine.indexOf('=') + 1)
        .trim()
        .replace(/\s+/g, '');
      const expectedWatch = buildConfig.watch.replace(/\s+/g, '');
      if (watch !== expectedWatch) {
        analysis.inconsistencies.push({
          file: filePath,
          issue: `Non-standard watch pattern for ${language}. Expected: ${buildConfig.watch}, Found: ${watch}`
        });
      }
    }
  });

  // Check name and handle fields
  const nameField = fileLines.find(line => line.trim().startsWith('name ='));
  const handleField = fileLines.find(line => line.trim().startsWith('handle ='));

  if (nameField && !nameField.includes('t:name')) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Name field should be "t:name"'
    });
  }

  if (handleField && !handleField.includes('{{handle}}')) {
    analysis.inconsistencies.push({
      file: filePath,
      issue: 'Handle field should use {{handle}}'
    });
  }

  // Check targeting section format (but not specific targets)
  const targetingSections = content.match(/\[\[extensions\.targeting\]\][^\[]+/g) || [];
  targetingSections.forEach(section => {
    const lines = section.split('\n').map(line => line.trim());
    const requiredFields = ['target', 'input_query', 'export'];
    
    requiredFields.forEach(field => {
      if (!lines.some(line => line.startsWith(field + ' ='))) {
        analysis.inconsistencies.push({
          file: filePath,
          issue: `Missing required field in targeting section: ${field}`
        });
      }
    });
  });
}

async function analyzeLocalesFile(functionDir, analysis) {
  const localesPath = path.join(functionDir, 'locales');
  const localeFilePath = path.join(localesPath, 'en.default.json.liquid');

  try {
    // Check if locales directory exists
    try {
      await fs.access(localesPath);
    } catch (error) {
      analysis.inconsistencies.push({
        file: localesPath,
        issue: 'Missing required locales directory'
      });
      return;
    }

    // Check if en.default.json.liquid exists
    let content;
    try {
      content = await fs.readFile(localeFilePath, 'utf8');
    } catch (error) {
      analysis.inconsistencies.push({
        file: localeFilePath,
        issue: 'Missing required en.default.json.liquid file'
      });
      return;
    }

    // Parse and compare content
    try {
      const fileContent = content.trim();
      const expectedContent = STANDARD_LOCALE_TEMPLATE.trim();
      
      if (fileContent !== expectedContent) {
        analysis.inconsistencies.push({
          file: localeFilePath,
          issue: 'Incorrect locale file content',
          expected: expectedContent,
          found: fileContent
        });
      }
    } catch (error) {
      analysis.inconsistencies.push({
        file: localeFilePath,
        issue: `Invalid JSON in locale file: ${error.message}`
      });
    }
  } catch (error) {
    analysis.inconsistencies.push({
      file: localeFilePath,
      issue: `Error checking locale file: ${error.message}`
    });
  }
}

async function analyzeSchemaGraphql(functionDir, analysis) {
  const schemaPath = path.join(functionDir, 'schema.graphql');
  const runGraphqlPath = path.join(functionDir, 'src', 'run.graphql.liquid');

  // Check for schema.graphql
  try {
    const content = await fs.readFile(schemaPath, 'utf8');

    // Check for and warn about auto-generated comments
    const autoGeneratedComment = content.includes('# This file is auto-generated') || 
                               content.includes('# please edit the ruby definition files') ||
                               content.includes('# Check out the "Docs" tab');

    if (autoGeneratedComment) {
      analysis.inconsistencies.push({
        file: schemaPath,
        issue: 'Contains auto-generated comments that should be removed',
        fix: 'Remove the auto-generated comment block from the top of the file'
      });
    }
  } catch (error) {
    analysis.inconsistencies.push({
      file: schemaPath,
      issue: 'Missing required schema.graphql file'
    });
  }

  // Check for run.graphql.liquid
  try {
    await fs.access(runGraphqlPath);
  } catch (error) {
    analysis.inconsistencies.push({
      file: runGraphqlPath,
      issue: 'Missing required run.graphql.liquid file'
    });
  }

  // Check for any additional .graphql.liquid files referenced in shopify.extension.toml
  const extensionTomlPath = path.join(functionDir, 'shopify.extension.toml.liquid');
  try {
    const extensionContent = await fs.readFile(extensionTomlPath, 'utf8');
    const inputQueryMatches = extensionContent.match(/input_query\s*=\s*"([^"]+)"/g) || [];
    
    for (const match of inputQueryMatches) {
      const queryPath = match.split('"')[1];  // Extract path from "input_query = "path""
      const fullPath = path.join(functionDir, queryPath);
      
      try {
        await fs.access(fullPath);
      } catch (error) {
        analysis.inconsistencies.push({
          file: fullPath,
          issue: `Missing GraphQL query file referenced in shopify.extension.toml.liquid`
        });
      }
    }
  } catch (error) {
    // Extension toml file will be checked elsewhere, no need to report here
  }
}

async function validateLanguageImplementations(analysis) {
  // First, group all functions by their base path (removing the language part)
  const functionGroups = new Map();

  // Helper to get the base path by removing the language part
  function getBasePath(path) {
    return path.replace(/\/(rust|javascript|typescript|wasm)\//, '/*/');
  }

  // Helper to get the function type from path
  function getFunctionType(path) {
    const parts = path.split('/');
    // Get the part before the language directory
    const typeIndex = parts.findIndex(part => 
      part === 'rust' || part === 'javascript' || part === 'typescript' || part === 'wasm'
    );
    return typeIndex > 0 ? parts[typeIndex - 1] : null;
  }

  // Helper to get the language from path
  function getLanguage(path) {
    if (path.includes('/rust/')) return 'rust';
    if (path.includes('/wasm/')) return 'wasm';
    if (path.includes('/typescript/')) return 'javascript'; // Count typescript as javascript
    if (path.includes('/javascript/')) return 'javascript';
    return null;
  }

  // Collect all shopify.extension.toml.liquid files
  const allFiles = await glob(["**/shopify.extension.toml.liquid"], {
    dot: true,
    ignore: ["**/node_modules"],
  });

  // Group files by their base path
  allFiles.forEach(file => {
    const basePath = getBasePath(file);
    const functionType = getFunctionType(file);
    const language = getLanguage(file);
    
    if (functionType && language) {
      if (!functionGroups.has(basePath)) {
        functionGroups.set(basePath, {
          type: functionType,
          implementations: new Set(),
          path: basePath
        });
      }
      functionGroups.get(basePath).implementations.add(language);
    }
  });

  // Check each function group for missing implementations
  functionGroups.forEach(({type, implementations, path}) => {
    const requiredLanguages = new Set(['rust', 'javascript', 'wasm']);
    const missing = [];

    requiredLanguages.forEach(lang => {
      if (!implementations.has(lang)) {
        missing.push(lang);
      }
    });

    if (missing.length > 0) {
      analysis.inconsistencies.push({
        file: path,
        issue: `Missing language implementations for ${type} function: ${missing.join(', ')}`,
        fix: `Create corresponding implementations in: ${missing.map(lang => `${type}/${lang}/`).join(', ')}`
      });
    }
  });
}

async function analyzeAllTemplates() {
  const cargoEntries = await glob(["**/Cargo.toml.liquid"], {
    dot: true,
    ignore: ["**/node_modules"],
  });

  const shopifyExtensionEntries = await glob(["**/shopify.extension.toml.liquid"], {
    dot: true,
    ignore: ["**/node_modules"],
  });

  const analysis = {
    totalFiles: cargoEntries.length + shopifyExtensionEntries.length,
    inconsistencies: [],
    lineDiscrepancies: []
  };

  // Check for language implementations
  await validateLanguageImplementations(analysis);

  // Analyze Cargo.toml.liquid files
  for (const entry of cargoEntries) {
    const content = await fs.readFile(entry, 'utf8');
    const functionDir = path.dirname(entry);
    
    // Check locale files and schema.graphql for each function
    await analyzeLocalesFile(functionDir, analysis);
    await analyzeSchemaGraphql(functionDir, analysis);
    
    if (!content.includes('{{handle | replace: " ", "-" | downcase}}') && content.includes('{{handle}}')) {
      analysis.inconsistencies.push({
        file: entry,
        issue: 'Non-standardized handle template variable'
      });
    }

    await checkFileAgainstTemplate(entry, content, STANDARD_TEMPLATE, analysis, 'Cargo.toml');

    // Check for corresponding main.rs
    const mainRsPath = path.join(path.dirname(entry), 'src', 'main.rs');
    try {
      const mainRsContent = await fs.readFile(mainRsPath, 'utf8');
      analysis.totalFiles++;
      await checkFileAgainstTemplate(mainRsPath, mainRsContent, STANDARD_MAIN_RS, analysis, 'main.rs');
    } catch (error) {
      analysis.inconsistencies.push({
        file: mainRsPath,
        issue: 'Missing or unreadable main.rs file'
      });
    }
  }

  // Analyze shopify.extension.toml.liquid files
  for (const entry of shopifyExtensionEntries) {
    const content = await fs.readFile(entry, 'utf8');
    const functionDir = path.dirname(entry);
    
    // Check locale files and schema.graphql for each function
    await analyzeLocalesFile(functionDir, analysis);
    await analyzeSchemaGraphql(functionDir, analysis);
    
    await analyzeShopifyExtensionToml(entry, content, analysis);
  }

  return analysis;
}

async function main() {
  console.log('Analyzing template files...');
  const analysis = await analyzeAllTemplates();
  
  console.log('\nAnalysis Results:');
  console.log(`Total files analyzed: ${analysis.totalFiles}`);
  
  if (analysis.inconsistencies.length > 0) {
    // Group inconsistencies by issue type
    const groupedIssues = new Map();
    
    analysis.inconsistencies.forEach(({file, issue, expected, found, fix}) => {
      if (!groupedIssues.has(issue)) {
        groupedIssues.set(issue, []);
      }
      groupedIssues.get(issue).push({file, expected, found, fix});
    });

    console.log('\nTemplate Inconsistencies:');
    // Sort issues by type
    const sortedIssues = Array.from(groupedIssues.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    sortedIssues.forEach(([issueType, occurrences]) => {
      console.log(`\n${issueType}:`);
      occurrences.forEach(({file, expected, found, fix}) => {
        console.log(`  - ${file}`);
        if (expected && found) {
          console.log('    Expected:');
          console.log(`    ${expected}`);
          console.log('    Found:');
          console.log(`    ${found}`);
        }
        if (fix) {
          console.log(`    Fix: ${fix}`);
        }
      });
    });
  }

  if (analysis.lineDiscrepancies.length > 0) {
    console.log('\nLine Discrepancies:');
    let currentFile = '';
    analysis.lineDiscrepancies.forEach(({file, line, expected, issue}) => {
      if (currentFile !== file) {
        console.log(`\n${file}:`);
        currentFile = file;
      }
      if (expected) {
        console.log(`  - ${issue}:`);
        console.log(`    Found:    ${line}`);
        console.log(`    Expected: ${expected}`);
      } else {
        console.log(`  - ${issue}: ${line || '[empty line]'}`);
      }
    });
  }
}

main().catch(console.error); 