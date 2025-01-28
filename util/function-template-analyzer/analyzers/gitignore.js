import path from 'path';
import { readFileIfExists, getLanguageFromPath } from '../utils/file-utils.js';

const RUST_GITIGNORE = `/target
Cargo.lock`;

const JAVASCRIPT_GITIGNORE = `dist
generated`;

export async function analyzeGitignore(functionDir, analysis) {
  const language = getLanguageFromPath(functionDir);
  
  // Skip WASM templates entirely
  if (language === 'wasm') {
    return;
  }

  const gitignorePath = path.join(functionDir, '.gitignore');
  
  const content = await readFileIfExists(gitignorePath);
  if (!content) {
    analysis.inconsistencies.push({
      file: gitignorePath,
      issue: 'Missing required .gitignore file',
      fix: `Create .gitignore with the standard ${language} template`
    });
    return;
  }

  // Normalize line endings and trim whitespace
  const normalizedContent = content.replace(/\r\n/g, '\n').trim();
  
  if (language === 'rust') {
    if (normalizedContent !== RUST_GITIGNORE) {
      analysis.inconsistencies.push({
        file: gitignorePath,
        issue: 'Incorrect .gitignore content for Rust function',
        expected: RUST_GITIGNORE,
        found: normalizedContent,
        fix: 'Replace with the standard Rust .gitignore template'
      });
    }
  } else if (language === 'javascript' || language === 'typescript') {
    if (normalizedContent !== JAVASCRIPT_GITIGNORE) {
      analysis.inconsistencies.push({
        file: gitignorePath,
        issue: 'Incorrect .gitignore content for JavaScript/TypeScript function',
        expected: JAVASCRIPT_GITIGNORE,
        found: normalizedContent,
        fix: 'Replace with the standard JavaScript .gitignore template'
      });
    }
  }
} 