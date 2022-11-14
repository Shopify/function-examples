/***
 * For local sample development / use without the Shopify CLI only.
 * This script replaces the liquid expansion functionality of the Shopify CLI for use cases where the Shopify CLI is not being used, like local sample development.
 */

import glob from 'fast-glob';
import { Liquid } from 'liquidjs';
import path from 'path';
import fs from 'node:fs/promises';
import { existsSync } from 'fs';
import toml from '@iarna/toml';

async function expandLiquidTemplates(template, liquidData) {
  const entries = await glob([path.join(template, "**/*.liquid")], {
    dot: true,
    ignore: ["**/node_modules"],
  });

  for (const entry of entries) {
    const engine = new Liquid();
    const content = await fs.readFile(entry, "utf8");
    const rendered = await engine.renderFile(entry, liquidData);
    const outputPath = entry.replace(".liquid", "");
    await fs.writeFile(outputPath, rendered);
    console.log(`  ${path.relative(process.cwd(), outputPath)}`);
  }
}

async function expandAppLiquidTemplates(appDir) {
  const samplePath = path.join(process.cwd(), appDir);
  const samples = (await fs.readdir(samplePath, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(samplePath, dirent.name));

  for (const sample of samples) {
    const configPath = path.join(sample, "shopify.app.toml");
    if (!existsSync(configPath)) {
      console.error(`${configPath} does not exist`);
      continue;
    }
    const appConfig = toml.parse(await fs.readFile(configPath, "utf8"));

    console.log(`Expanding liquid templates for ${appConfig.name}`);

    const liquidData = {
      app_name: appConfig.name,
      dependency_manager: "yarn",
    };

    await expandLiquidTemplates(sample, liquidData);

    console.log();
  }
}

async function directoryNames(parentPath) {
  return (await fs.readdir(parentPath, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function expandExtensionLiquidTemplates(domainName) {
  console.log(`Expanding liquid templates for ${domainName}`);
  const domainPath = path.join(process.cwd(), domainName);

  const langNames = await directoryNames(domainPath);
  for (const langName of langNames) {
    const langPath = path.join(domainPath, langName);
    const extensionTypeNames = await directoryNames(langPath);

    for (const extensionTypeName of extensionTypeNames) {
      const extensionTypePath = path.join(langPath, extensionTypeName);
      const templateNames = await directoryNames(extensionTypePath);

      for (const templateName of templateNames) {
        const templatePath = path.join(extensionTypePath, templateName);
        const liquidData = {
          name: templateName,
          extensionType: extensionTypeName.replaceAll('-', '_'),
        };

        await expandLiquidTemplates(templatePath, liquidData);
      }
    }
  }
  console.log();
}

const SAMPLE_APP_DIR = 'sample-apps';
await expandAppLiquidTemplates(SAMPLE_APP_DIR);

const DOMAINS = ['checkout', 'discounts'];
for (const domain of DOMAINS) {
  await expandExtensionLiquidTemplates(domain);
}

console.log('The above files should be added to .gitignore if they have not already been added.');
