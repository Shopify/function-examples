/***
 * For local sample development / use without the Shopify CLI only.
 * Shopify CLI will expand liquid template files when these templates are used.
 */

 import glob from 'fast-glob';
 import { Liquid } from 'liquidjs';
 import path from 'path';
 import fs from 'node:fs/promises';
 import { existsSync } from 'fs';
 import toml from '@iarna/toml';
 
 const samplePath = path.join(process.cwd(), 'sample-apps');
 const samples = (await fs.readdir(samplePath, { withFileTypes: true }))
     .filter(dirent => dirent.isDirectory())
     .map(dirent => path.join(samplePath, dirent.name));
 
 for (const sample of samples) {
 
     const configPath = path.join(sample, 'shopify.app.toml');
     if (!(existsSync(configPath))) {
         console.error(`${configPath} does not exist`);
         continue;
     }
     const appConfig = toml.parse(await fs.readFile(configPath, 'utf8'));
 
     console.log(`Expanding liquid templates for ${appConfig.name}`);
 
     const liquidData = {
         app_name: appConfig.name,
         dependency_manager: 'yarn'
     }
 
     const entries = await glob(
         [path.join(sample, '**/*.liquid')],
         {
             dot: true,
             ignore: ['**/node_modules'],
         });
     
     for (const entry of entries) {
         const engine = new Liquid();
         const content = await fs.readFile(entry, 'utf8');
         const rendered = await engine.renderFile(entry, liquidData);
         const outputPath = entry.replace('.liquid', '');
         await fs.writeFile(outputPath, rendered);
         console.log(outputPath);
     }
 
     console.log();
 }
 
 console.log('The above files should be added to .gitignore if they have not already been added.');