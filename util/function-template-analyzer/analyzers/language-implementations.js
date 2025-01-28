import path from 'path';
import { getLanguageFromPath } from '../utils/file-utils.js';

export async function validateLanguageImplementations(analysis) {
  // Group functions by their base path (removing the language part)
  const functionGroups = new Map();

  analysis.entries.forEach(entry => {
    const language = getLanguageFromPath(entry);
    if (!language) return;

    // Get the base path by removing the language part
    const basePath = entry.replace(`/${language}/`, '/*/');
    
    if (!functionGroups.has(basePath)) {
      functionGroups.set(basePath, new Set());
    }
    functionGroups.get(basePath).add(language);
  });

  // Check each function group for missing implementations
  functionGroups.forEach((implementations, basePath) => {
    const requiredLanguages = ['rust', 'javascript', 'wasm'];
    const missingLanguages = requiredLanguages.filter(lang => !implementations.has(lang));

    if (missingLanguages.length > 0) {
      const functionType = basePath.split('/').slice(-2)[0];
      const suggestedPath = basePath.replace('/*/', '/');
      
      analysis.inconsistencies.push({
        file: suggestedPath,
        issue: `Missing language implementations for ${functionType} function`,
        found: Array.from(implementations).join(', '),
        expected: requiredLanguages.join(', '),
        fix: `Create corresponding implementations in: ${missingLanguages.map(lang => suggestedPath.replace('*', lang)).join(', ')}`
      });
    }
  });
} 