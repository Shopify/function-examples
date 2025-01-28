import fs from 'node:fs/promises';
import path from 'path';

export async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

export async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function getLanguageFromPath(filePath) {
  if (filePath.includes('/rust/')) return 'rust';
  if (filePath.includes('/wasm/')) return 'wasm';
  if (filePath.includes('/typescript/')) return 'javascript';
  if (filePath.includes('/javascript/')) return 'javascript';
  return null;
} 