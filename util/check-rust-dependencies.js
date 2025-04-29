import fs from 'fs/promises';
import fastGlob from 'fast-glob';
import { updateTomlValues } from '@shopify/toml-patch';

const ROOT_DIR = '.';
const FILE_PATTERNS = ['**/Cargo.toml', '**/Cargo.toml.liquid'];
const LIQUID_PLACEHOLDER = 'LIQUID_PLACEHOLDER';

async function findAllCargoFiles() {
  return fastGlob(FILE_PATTERNS, { cwd: ROOT_DIR, absolute: true });
}

async function getLatestVersion(packageName) {
  try {
    // Fetch the latest version of a package from crates.io
    const response = await fetch(`https://crates.io/api/v1/crates/${packageName}`);
    const jsonResponse = await response.json();
    return jsonResponse.crate.max_version;
  } catch (error) {
    console.warn(`Could not fetch version for package ${packageName}:`, error.message);
    return null;
  }
}

async function updateDependencyVersion(name, currentVersion) {
  const latestVersion = await getLatestVersion(name);

  if (latestVersion) {
    if (typeof currentVersion === 'string') {
      if (!currentVersion.includes(latestVersion)) {
        console.log(`Updating ${name} from ${currentVersion} to ${latestVersion}`);
        return latestVersion;
      }
    } else if (typeof currentVersion === 'object' && 'version' in currentVersion) {
      if (!currentVersion.version.includes(latestVersion)) {
        console.log(`Updating ${name} from ${currentVersion.version} to ${latestVersion}`);
        return { ...currentVersion, version: latestVersion };
      }
    }
  }
  return currentVersion;
}

function preprocessLiquidSyntax(content) {
  const liquidExpressions = [];
  const placeholderContent = content.replace(/\{\{.*?\}\}|\{%\s.*?\s%\}/g, (match) => {
    liquidExpressions.push(match);
    return `{${LIQUID_PLACEHOLDER}:${liquidExpressions.length - 1}}`;
  });
  return { placeholderContent, liquidExpressions };
}

function restoreLiquidSyntax(content, liquidExpressions) {
  return content.replace(new RegExp(`\\{${LIQUID_PLACEHOLDER}:(\\d+)\\}`, 'g'), (match, index) => {
    return liquidExpressions[Number(index)];
  });
}

async function checkAndUpdateDependencies(filePath) {
  let content = await fs.readFile(filePath, 'utf8');

  const isLiquidFile = filePath.endsWith('.liquid');
  let liquidExpressions = [];
  
  if (isLiquidFile) {
    const processed = preprocessLiquidSyntax(content);
    content = processed.placeholderContent;
    liquidExpressions = processed.liquidExpressions;
  }
  
  try {
    // Get all dependencies and their latest versions
    const updates = [];
    
    // Simple regex to extract dependencies section
    const depsMatch = content.match(/\[dependencies\]([\s\S]*?)(\[|\Z)/);
    if (depsMatch) {
      const depsSection = depsMatch[1];
      // Extract dependency names with a simple regex
      const depMatches = depsSection.matchAll(/^([a-zA-Z0-9_-]+)\s*=\s*("[^"]*"|{[^}]*})/gm);
      
      for (const match of depMatches) {
        const name = match[1].trim();
        const currentDef = match[2];
        
        // Only process string dependencies for now
        if (currentDef.startsWith('"')) {
          const currentVersion = currentDef.replace(/"/g, '');
          const latestVersion = await getLatestVersion(name);
          
          if (latestVersion && !currentVersion.includes(latestVersion)) {
            console.log(`Updating ${name} from ${currentVersion} to ${latestVersion}`);
            updates.push([['dependencies', name], latestVersion]);
          }
        } else if (currentDef.startsWith('{')) {
          // Extract version from table syntax like { version = "1.0.0", features = ["derive"] }
          const versionMatch = currentDef.match(/version\s*=\s*"([^"]*)"/);
          if (versionMatch) {
            const currentVersion = versionMatch[1];
            const latestVersion = await getLatestVersion(name);
            
            if (latestVersion && !currentVersion.includes(latestVersion)) {
              console.log(`Updating ${name} from ${currentVersion} to ${latestVersion}`);
              // For table dependencies, we need to update just the version field
              // This approach preserves other fields like features
              const newDef = currentDef.replace(/version\s*=\s*"[^"]*"/, `version = "${latestVersion}"`);
              updates.push([['dependencies', name], newDef.replace(/[{}]/g, '').trim()]);
            }
          }
        }
      }
    }
    
    // Only update the file if we have changes
    if (updates.length > 0) {
      let updatedContent = updateTomlValues(content, updates);
      
      if (isLiquidFile) {
        updatedContent = restoreLiquidSyntax(updatedContent, liquidExpressions);
      }
      
      await fs.writeFile(filePath, updatedContent, 'utf8');
      console.log(`Updated dependencies in ${filePath}`);
    } else {
      console.log(`No updates needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to update TOML in file: ${filePath}`, error.message);
  }
}

async function main() {
  const cargoFiles = await findAllCargoFiles();
  for (const filePath of cargoFiles) {
    await checkAndUpdateDependencies(filePath);
  }
}

main().catch(error => {
  console.error('Error checking and updating dependencies:', error);
  process.exit(1);
});