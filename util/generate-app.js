import fs from 'fs/promises';
import path from 'path';
import fastGlob from 'fast-glob';
import { existsSync } from 'fs';

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

// Method to format directories for toml
function formatDirectoriesForToml(directories) {
  return directories.map(dir => `'${dir}'`).join(',\n  ');
}

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
  const extensionFiles = await findAllExtensionFiles();

  // Transform paths to be relative to root and exclude the filenames
  const extensionDirectories = extensionFiles.map(filePath => path.relative(ROOT_DIR, path.dirname(filePath)));

  // Remove duplicates
  const uniqueDirectories = [...new Set(extensionDirectories)];
  
  // Format directories for TOML
  const formattedDirectories = formatDirectoriesForToml(uniqueDirectories);
  
  // Read existing content
  const existingContent = await readExistingToml();
  
  let newContent;
  
  if (existingContent) {
    // Extract key parts from the existing content
    let mainConfig = '';
    let webhooksSection = '';
    let accessScopesSection = '';
    let authSection = '';
    let posSection = '';
    let otherSections = '';

    // Extract the main configuration (up to the first section)
    const mainMatch = existingContent.match(/^([\s\S]*?)(\[\w+\]|extension_directories|web_directories|$)/);
    if (mainMatch) {
      mainConfig = mainMatch[1].trim();
    }

    // Extract webhooks section
    const webhooksMatch = existingContent.match(/\[webhooks\]([\s\S]*?)(\[\w+\]|extension_directories|web_directories|$)/);
    if (webhooksMatch) {
      webhooksSection = `\n\n[webhooks]${webhooksMatch[1]}`;
      if (webhooksMatch[2] && !webhooksMatch[2].startsWith('[')) {
        webhooksSection = webhooksSection.trim();
      }
    }

    // Extract access_scopes section
    const scopesMatch = existingContent.match(/\[access_scopes\]([\s\S]*?)(\[\w+\]|extension_directories|web_directories|$)/);
    if (scopesMatch) {
      accessScopesSection = `\n\n[access_scopes]${scopesMatch[1]}`;
      if (scopesMatch[2] && !scopesMatch[2].startsWith('[')) {
        accessScopesSection = accessScopesSection.trim();
      }
    }

    // Extract auth section
    const authMatch = existingContent.match(/\[auth\]([\s\S]*?)(\[\w+\]|extension_directories|web_directories|$)/);
    if (authMatch) {
      authSection = `\n\n[auth]${authMatch[1]}`;
      if (authMatch[2] && !authMatch[2].startsWith('[')) {
        authSection = authSection.trim();
      }
    }

    // Extract pos section
    const posMatch = existingContent.match(/\[pos\]([\s\S]*?)(\[\w+\]|extension_directories|web_directories|$)/);
    if (posMatch) {
      posSection = `\n\n[pos]${posMatch[1]}`;
      if (posMatch[2] && !posMatch[2].startsWith('[')) {
        posSection = posSection.trim();
      }
    }

    // Build the new content with directories before other sections
    newContent = `${mainConfig}\n\n\nextension_directories = [\n  ${formattedDirectories}\n]\n\nweb_directories = []${webhooksSection}${accessScopesSection}${authSection}${posSection}${otherSections}`;

  } else {
    // Create a new file with extension_directories and web_directories
    newContent = `# Learn more about configuring your app at https://shopify.dev/docs/apps/tools/cli/configuration

extension_directories = [\n  ${formattedDirectories}\n]\n\nweb_directories = []\n`;
  }
  
  // Write the updated content to the file
  await fs.writeFile(OUTPUT_FILE, newContent, 'utf8');
  console.log(`Updated ${OUTPUT_FILE} with extension directories`);
}

updateAppToml().catch(error => {
  console.error('Error updating shopify.app.toml file:', error);
  process.exit(1);
});