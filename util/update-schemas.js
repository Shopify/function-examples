import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';
import { existsSync } from 'fs';

const execPromise = util.promisify(exec);
const APP_TOML_FILE = 'shopify.app.toml';
const COMMAND_TEMPLATE = 'shopify app function schema';

// Method to read shopify.app.toml and extract needed configuration
async function getConfig() {
  try {
    if (!existsSync(APP_TOML_FILE)) {
      throw new Error(`${APP_TOML_FILE} does not exist. Run 'shopify app config link' first.`);
    }
    
    const content = await fs.readFile(APP_TOML_FILE, 'utf8');
    const lines = content.split('\n');
    
    const config = {
      clientId: '',
      directories: []
    };

    let inExtensionDirectories = false;
    const dirRegex = /'([^']+)'/g;
    const quoteRegex = /"([^"]+)"/g;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Extract client_id
      if (trimmedLine.startsWith('client_id')) {
        const match = line.match(quoteRegex);
        if (match) {
          config.clientId = match[0].replace(/"/g, '');
        }
        continue;
      }

      // Check if we're entering the extension_directories section
      if (trimmedLine.startsWith('extension_directories')) {
        inExtensionDirectories = true;
        continue;
      }

      // Check if we're leaving the extension_directories section
      if (inExtensionDirectories && trimmedLine.startsWith(']')) {
        inExtensionDirectories = false;
        continue;
      }

      // Extract directories only when in extension_directories section
      if (inExtensionDirectories) {
        // Try to match with both single and double quotes
        let match = trimmedLine.match(dirRegex);
        if (!match) {
          match = trimmedLine.match(quoteRegex);
        }
        
        if (match) {
          const cleanDir = match[0].replace(/['"]/g, '').trim();
          if (cleanDir && existsSync(cleanDir)) {
            config.directories.push(cleanDir);
          }
        }
      }
    }

    return config;
  } catch (error) {
    console.error(`Error reading ${APP_TOML_FILE}:`, error);
    throw error;
  }
}

// Method to run the command for each directory
async function updateSchemas() {
  try {
    const config = await getConfig();

    if (!config.clientId) {
      throw new Error('Client ID not found in shopify.app.toml');
    }

    if (config.directories.length === 0) {
      console.warn('No valid extension directories found in shopify.app.toml');
      return;
    }

    console.log(`Found ${config.directories.length} extension directories`);
    console.log(`Using client ID: ${config.clientId}`);
    
    for (const dir of config.directories) {
      try {
        const command = `${COMMAND_TEMPLATE} --path ${dir}`;
        console.log(`\nUpdating schema for: ${dir}`);
        console.log(`Running: ${command}`);

        const { stdout, stderr } = await execPromise(command);
        if (stdout) console.log(`Output: ${stdout.trim()}`);
        if (stderr && !stderr.includes('warning')) console.error(`Error: ${stderr.trim()}`);
      } catch (error) {
        console.error(`Failed to update schema for ${dir}:`, error.message);
      }
    }
    
    console.log("\nSchema update completed");
  } catch (error) {
    console.error('Failed to update schemas:', error);
  }
}

updateSchemas().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});