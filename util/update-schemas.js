import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';
import { existsSync } from 'fs';
import toml from '@iarna/toml';

const execPromise = util.promisify(exec);
const APP_TOML_FILE = 'shopify.app.toml';
const COMMAND_TEMPLATE = 'shopify app function schema';

// Method to read shopify.app.toml and extract needed configuration
async function getConfig() {
  try {
    if (!existsSync(APP_TOML_FILE)) {
      throw new Error(`${APP_TOML_FILE} does not exist. Run 'shopify app config link' first to create the file.`);
    }
    
    const content = await fs.readFile(APP_TOML_FILE, 'utf8');
    
    // Parse the TOML content
    const parsedToml = toml.parse(content);
    
    const config = {
      clientId: '',
      directories: []
    };
    
    // Extract client_id if it exists
    if (parsedToml.client_id) {
      config.clientId = parsedToml.client_id;
    }
    
    // Extract extension directories if they exist
    if (parsedToml.extension_directories && Array.isArray(parsedToml.extension_directories)) {
      // Filter the directories to ensure they exist
      config.directories = parsedToml.extension_directories.filter(dir => {
        const exists = existsSync(dir);
        if (!exists) {
          console.warn(`Directory specified in config does not exist: ${dir}`);
        }
        return exists;
      });
    }

    return config;
  } catch (error) {
    console.error(`Error reading ${APP_TOML_FILE}:`, error);
    throw error;
  }
}

// Method to run the schema update command for each directory
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