import path from 'path';
import fastGlob from 'fast-glob';
import { analyzeCargoToml } from './analyzers/cargo-toml.js';
import { analyzeLocales } from './analyzers/locales.js';
import { analyzeGraphQL } from './analyzers/graphql.js';
import { analyzeShopifyExtension } from './analyzers/shopify-extension.js';
import { validateLanguageImplementations } from './analyzers/language-implementations.js';
import { formatResults } from './formatters/output.js';

async function findTemplateFiles() {
  // Find all Cargo.toml.liquid and shopify.extension.toml.liquid files
  const entries = await fastGlob([
    "**/Cargo.toml.liquid",
    "**/shopify.extension.toml.liquid"
  ], {
    ignore: ["**/node_modules/**", "**/target/**", "**/dist/**"],
    absolute: false
  });

  return entries;
}

export async function analyzeAllTemplates(entries = null) {
  // If no entries provided, find them automatically
  if (!entries) {
    entries = await findTemplateFiles();
    if (entries.length === 0) {
      console.error('No template files found in the current directory');
      return 1;
    }
    console.log(`Found ${entries.length} template files to analyze...`);
  }

  const analysis = {
    entries,
    totalFiles: entries.length,
    inconsistencies: [],
    lineDiscrepancies: []
  };

  // Process each entry
  for (const entry of entries) {
    const fileName = path.basename(entry);
    const functionDir = path.dirname(entry);

    if (fileName === 'Cargo.toml.liquid') {
      await analyzeCargoToml(entry, analysis);
    } else if (fileName === 'shopify.extension.toml.liquid') {
      await analyzeShopifyExtension(entry, analysis);
    }

    // Analyze locales for each function directory
    await analyzeLocales(functionDir, analysis);

    // Analyze GraphQL files
    await analyzeGraphQL(functionDir, analysis);
  }

  // Validate language implementations
  await validateLanguageImplementations(analysis);

  // Format and display results
  formatResults(analysis);

  // Return non-zero exit code if there are any issues
  return analysis.inconsistencies.length > 0 || analysis.lineDiscrepancies.length > 0 ? 1 : 0;
}

// If this file is run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  try {
    const exitCode = await analyzeAllTemplates();
    process.exit(exitCode);
  } catch (error) {
    console.error('Error during analysis:', error);
    process.exit(1);
  }
} 