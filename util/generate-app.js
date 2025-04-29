import fs from 'fs/promises';
import path from 'path';
import fastGlob from 'fast-glob';
import { existsSync } from 'fs';
import { updateTomlValues } from '@shopify/toml-patch';

const ROOT_DIR = '.';
const FILE_PATTERN = '**/shopify.extension.toml.liquid';
const EXCLUDED_DIRS = ['samples', 'sample-apps', 'node_modules'];
const OUTPUT_FILE = 'shopify.app.toml';

// Method to find all shopify.extension.toml.liquid files excluding specified directories
async function findAllExtensionFiles() {
  return fastGlob(FILE_PATTERN, {
    cwd: ROOT_DIR,
    absolute: true,
    ignore: EXCLUDED_DIRS.map(dir => `${dir}/**`)
  });
}

// Method is no longer needed as we use toml-patch's array handling

// Method to read existing shopify.app.toml if it exists
async function readExistingToml() {
  try {
    if (existsSync(OUTPUT_FILE)) {
      return await fs.readFile(OUTPUT_FILE, 'utf8');
    }
    return null;
  } catch (error) {
    console.error(`Error reading ${OUTPUT_FILE}:`, error);
    return null;
  }
}

// Main method to update or create the shopify.app.toml file
async function updateAppToml() {
  try {
    const extensionFiles = await findAllExtensionFiles();

    // Transform paths to be relative to root and exclude the filenames
    const extensionDirectories = extensionFiles.map(filePath => path.relative(ROOT_DIR, path.dirname(filePath)));

    // Remove duplicates
    const uniqueDirectories = [...new Set(extensionDirectories)];
    
    // Read existing content
    const existingContent = await readExistingToml();
    
    // Require an existing shopify.app.toml file
    if (!existingContent) {
      throw new Error(`${OUTPUT_FILE} not found. Please run 'shopify app config link' first to create the file.`);
    }
    
    // Use toml-patch to update the TOML content with extension directories
    const updatedContent = updateTomlValues(existingContent, [
      [['extension_directories'], uniqueDirectories],
      [['web_directories'], []]
    ]);
    
    // Write the updated content to the file
    await fs.writeFile(OUTPUT_FILE, updatedContent, 'utf8');
    console.log(`Updated ${OUTPUT_FILE} with ${uniqueDirectories.length} extension directories`);
  } catch (error) {
    console.error(`Error updating ${OUTPUT_FILE}:`, error);
    throw error;
  }
}

updateAppToml().catch(error => {
  console.error('Error updating shopify.app.toml file:', error);
  process.exit(1);
});