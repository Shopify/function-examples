import fs from 'fs/promises';
import fastGlob from 'fast-glob';
import dayjs from 'dayjs';
import { updateTomlValues } from '@shopify/toml-patch';

const ROOT_DIR = '.';
const FILE_PATTERN = '**/shopify.extension.toml.liquid';
const LIQUID_PLACEHOLDER = 'LIQUID_PLACEHOLDER';

// Method to get the latest API version based on today's date
function getLatestApiVersion() {
  const date = dayjs();
  const year = date.year();
  const month = date.month();
  const quarter = Math.floor(month / 3);

  const monthNum = quarter * 3 + 1;
  const paddedMonth = String(monthNum).padStart(2, '0');

  return `${year}-${paddedMonth}`;
}

// Method to find all shopify.extension.toml.liquid files
async function findAllExtensionFiles() {
  return fastGlob(FILE_PATTERN, { cwd: ROOT_DIR, absolute: true });
}

// Function to preprocess liquid syntax
function preprocessLiquidSyntax(content) {
  const liquidExpressions = [];
  const placeholderContent = content.replace(/\{\{.*?\}\}|\{%\s.*?\s%\}/g, (match) => {
    liquidExpressions.push(match);
    return `{${LIQUID_PLACEHOLDER}:${liquidExpressions.length - 1}}`;
  });
  return { placeholderContent, liquidExpressions };
}

// Function to restore liquid syntax
function restoreLiquidSyntax(content, liquidExpressions) {
  return content.replace(new RegExp(`\\{${LIQUID_PLACEHOLDER}:(\\d+)\\}`, 'g'), (match, index) => {
    return liquidExpressions[Number(index)];
  });
}

// Method to update the API version in the file using toml-patch
async function updateApiVersion(filePath, latestVersion) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Handle liquid templates if needed
    const isLiquidFile = filePath.endsWith('.liquid');
    let liquidExpressions = [];
    let processedContent = content;
    
    if (isLiquidFile) {
      const processed = preprocessLiquidSyntax(content);
      processedContent = processed.placeholderContent;
      liquidExpressions = processed.liquidExpressions;
    }
    
    // Use toml-patch to update the API version
    const updates = [
      [['api_version'], latestVersion]
    ];
    
    let updatedContent = updateTomlValues(processedContent, updates);
    
    // Restore liquid syntax if needed
    if (isLiquidFile) {
      updatedContent = restoreLiquidSyntax(updatedContent, liquidExpressions);
    }
    
    await fs.writeFile(filePath, updatedContent, 'utf8');
    console.log(`Updated API version in ${filePath} to ${latestVersion}`);
    
  } catch (error) {
    console.error(`Error updating API version in ${filePath}:`, error.message);
  }
}

// Main method to check and update API versions
async function checkAndUpdateApiVersions() {
  const latestVersion = getLatestApiVersion();
  console.log(`Latest API version: ${latestVersion}`);
  const extensionFiles = await findAllExtensionFiles();
  console.log(`Found ${extensionFiles.length} extension files to check`);

  for (const filePath of extensionFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const match = content.match(/api_version\s*=\s*"(\d{4}-\d{2})"/);
      
      if (match) {
        const currentVersion = match[1];
        
        if (currentVersion !== latestVersion) {
          console.log(`Updating ${filePath} from ${currentVersion} to ${latestVersion}`);
          await updateApiVersion(filePath, latestVersion);
        } else {
          console.log(`API version in ${filePath} is already up to date (${currentVersion}).`);
        }
      } else {
        console.warn(`No API version found in ${filePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
}

checkAndUpdateApiVersions().catch(error => {
  console.error('Error checking and updating API versions:', error);
  process.exit(1);
});