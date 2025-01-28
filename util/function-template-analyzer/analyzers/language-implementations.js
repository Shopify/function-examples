import path from 'path';
import { getLanguageFromPath } from '../utils/file-utils.js';

// All functions must have all three implementations
const REQUIRED_LANGUAGES = ['rust', 'javascript', 'wasm'];

export async function validateLanguageImplementations(analysis) {
  // Group functions by their base path (removing the language part)
  const functionGroups = new Map();

  analysis.entries.forEach(entry => {
    const language = getLanguageFromPath(entry);
    if (!language) return;

    // Get the function path by removing both language and file name
    const functionPath = path.dirname(entry.replace(`/${language}/`, '/*/'));
    
    if (!functionGroups.has(functionPath)) {
      functionGroups.set(functionPath, new Set());
    }
    functionGroups.get(functionPath).add(language);
  });

  // Check each function group for missing implementations
  functionGroups.forEach((implementations, functionPath) => {
    const missingLanguages = REQUIRED_LANGUAGES.filter(lang => !implementations.has(lang));

    if (missingLanguages.length > 0) {
      const basePath = functionPath.replace('/*/', '/');
      
      analysis.inconsistencies.push({
        file: basePath,
        issue: `Function is missing required language implementations`,
        found: Array.from(implementations).join(', '),
        expected: REQUIRED_LANGUAGES.join(', '),
        fix: `Create implementations in: ${missingLanguages.map(lang => basePath.replace('*', lang)).join(', ')}`
      });
    }
  });
} 