import fs from 'node:fs/promises';
import path from 'node:path';

import toml from '@iarna/toml';
import Ajv from 'ajv';

const schema = {
    type: 'object',
    properties: {
        api_version: {
            type: 'string',
            pattern: '^(202\\d{1}-\\d{2}|unstable)$', // Matches "202X-XX" format
        },
        extensions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    description: { type: 'string' },
                    handle: { type: 'string' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    // build: {
                    //     type: 'object',
                    //     properties: {
                    //         command: { type: 'string' },
                    //         path: { type: 'string' },
                    //         additionalProperties: true, // Allow other properties in build
                    //     },
                    //     required: ['command', 'path'],
                    // },
                    // ui: {
                    //     type: 'object',
                    //     properties: {
                    //         paths: {
                    //             type: 'object',
                    //             properties: {
                    //                 create: { type: 'string' },
                    //                 details: { type: 'string' },
                    //                 additionalProperties: { type: 'string' }, // Allow other paths
                    //             },
                    //             additionalProperties: true, // Allow other keys in paths
                    //         },
                    //         additionalProperties: true, // Allow other properties in ui
                    //     },
                    //     additionalProperties: true, // Allow other keys in ui
                    // },
                    // targeting: {
                    //     type: 'array',
                    //     items: {
                    //         type: 'object',
                    //         properties: {
                    //             export: { type: 'string' },
                    //             input_query: { type: 'string' },
                    //             target: { type: 'string' },
                    //             additionalProperties: true, // Allow other properties in targeting item
                    //         },
                    //         required: ['export', 'input_query', 'target'],
                    //         additionalProperties: true, // Allow other keys in targeting item
                    //     },
                    // },
                    // additionalProperties: true, // Allow other properties in extension
                },
                required: ['description', 'handle', 'name', 'type', 'build'],
                additionalProperties: true, // Allow other keys in extension
            },
        },
        additionalProperties: true, // Allow other top-level properties
    },
    required: ['api_version'],
    // required: ['api_version', 'extensions'],
    additionalProperties: true, // Allow other top-level keys
};

const ajv = new Ajv();
const compiledAjv = ajv.compile(schema);

async function findExtensionTomlFiles(directory) {
    const files = await fs.readdir(directory);
    const matchingFiles = [];

    for (const file of files) {
        if (file === 'node_modules') {
            continue;
        }

        const fullPath = path.join(directory, file);
        const stats = await fs.stat(fullPath);

        if (stats.isFile() && file === 'shopify.extension.toml') {
            matchingFiles.push(fullPath);
        } else if (stats.isDirectory()) {
            // Recursively search subdirectories
            const subDirectoryFiles = await findExtensionTomlFiles(fullPath);
            matchingFiles.push(...subDirectoryFiles);
        }
    }

    return matchingFiles;
}

async function testSchema(filename) {
    await fs.readFile(filename, 'utf8')
        .then(data => {
            const parsedData = toml.parse(data);
            const isValid = compiledAjv(parsedData);

            if (isValid) {
                console.log(`Validation successful for ${filename}`);
            } else {
                console.error(`Validation failed for ${filename}:`);
                console.error(compiledAjv.errors);

                process.exit(-1)
            }
        })
        .catch(_ => {
            throw new Error(`Error reading file ${filename}.`);
        });
}

async function test() {
    const filenames = await findExtensionTomlFiles('./');

    filenames.forEach(filename => {
         testSchema(filename);
    });
}

await test();
