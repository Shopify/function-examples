import path from 'path';
import { readFileIfExists } from '../utils/file-utils.js';
import { STANDARD_CARGO_TEMPLATE, STANDARD_MAIN_RS } from '../templates/standard-templates.js';
import { readdir, access } from 'fs/promises';

async function checkMainRsModules(mainRsPath, content, analysis) {
  const srcDir = path.dirname(mainRsPath);
  const moduleLines = [];

  // Always include the standard imports
  moduleLines.push('use std::process;');

  // Check for run.rs (required)
  try {
    await access(path.join(srcDir, 'run.rs'));
    moduleLines.push('pub mod run;');
  } catch (error) {
    analysis.inconsistencies.push({
      file: mainRsPath,
      issue: 'Missing required run.rs module'
    });
  }

  // Check for fetch.rs (optional)
  try {
    await access(path.join(srcDir, 'fetch.rs'));
    moduleLines.push('pub mod fetch;');
  } catch (error) {
    // fetch.rs is optional, so we don't need to report it missing
  }

  // Add any other .rs files in the src directory (excluding main.rs)
  const srcFiles = await readdir(srcDir);
  for (const file of srcFiles) {
    if (file.endsWith('.rs') && file !== 'main.rs' && file !== 'run.rs' && file !== 'fetch.rs') {
      const moduleName = file.replace('.rs', '');
      moduleLines.push(`pub mod ${moduleName};`);
    }
  }

  // Sort the module declarations for consistency
  moduleLines.sort();

  // Add the main function
  moduleLines.push('');  // Empty line for spacing
  moduleLines.push('fn main() {');
  moduleLines.push('    eprintln!("Please invoke a named export.");');
  moduleLines.push('    process::exit(1);');
  moduleLines.push('}');

  return moduleLines.join('\n');
}

async function checkFileAgainstTemplate(filePath, content, template, analysis, type = 'Cargo.toml') {
  if (type === 'main.rs') {
    template = await checkMainRsModules(filePath, content, analysis);
  }

  const fileLines = content.split('\n').map(line => line.trim()).filter(line => line);
  const templateLines = template.split('\n').map(line => line.trim()).filter(line => line);

  fileLines.forEach((line, index) => {
    if (type === 'Cargo.toml' && (line.includes('{%') || line.includes('%}') || !line)) return;
    
    const normalizedLine = type === 'Cargo.toml' 
      ? line.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
      : line;
    
    const templateLine = templateLines.find(tLine => {
      if (type === 'Cargo.toml') {
        if (line.startsWith('[') && line.endsWith(']')) {
          return line === tLine;
        }
        const lineKey = line.split('=')[0]?.trim();
        const tLineKey = tLine.split('=')[0]?.trim();
        return lineKey === tLineKey;
      }
      return line === tLine;
    });

    if (!templateLine) {
      if (type === 'main.rs' && line.startsWith('pub mod ') && line.endsWith(';')) {
        const moduleName = line.slice(8, -1);
        const moduleFile = path.join(path.dirname(filePath), `${moduleName}.rs`);
        if (!fs.existsSync(moduleFile)) {
          analysis.lineDiscrepancies.push({
            file: filePath,
            line: line,
            issue: `Module declared but ${moduleName}.rs file not found`
          });
        }
      } else {
        analysis.lineDiscrepancies.push({
          file: filePath,
          line: line,
          issue: 'Extra line not in template'
        });
      }
    } else if (normalizedLine !== templateLine) {
      analysis.lineDiscrepancies.push({
        file: filePath,
        line: line,
        expected: templateLine,
        issue: 'Line differs from template'
      });
    }
  });

  templateLines.forEach(templateLine => {
    const normalizedTemplateLine = type === 'Cargo.toml'
      ? templateLine.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
      : templateLine;
    
    const hasLine = fileLines.some(line => {
      const normalizedLine = type === 'Cargo.toml'
        ? line.replace(/\{\{.*?\}\}/g, '{{handle | replace: " ", "-" | downcase}}')
        : line;
      return normalizedLine === normalizedTemplateLine;
    });

    if (!hasLine && (type !== 'Cargo.toml' || !templateLine.includes('{{'))) {
      analysis.lineDiscrepancies.push({
        file: filePath,
        expected: templateLine,
        issue: 'Missing line from template'
      });
    }
  });
}

export async function analyzeCargoToml(entry, analysis) {
  const content = await readFileIfExists(entry);
  if (!content) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Unable to read Cargo.toml.liquid file'
    });
    return;
  }

  if (!content.includes('{{handle | replace: " ", "-" | downcase}}') && content.includes('{{handle}}')) {
    analysis.inconsistencies.push({
      file: entry,
      issue: 'Non-standardized handle template variable'
    });
  }

  await checkFileAgainstTemplate(entry, content, STANDARD_CARGO_TEMPLATE, analysis, 'Cargo.toml');

  // Check for corresponding main.rs
  const mainRsPath = path.join(path.dirname(entry), 'src', 'main.rs');
  const mainRsContent = await readFileIfExists(mainRsPath);
  if (!mainRsContent) {
    analysis.inconsistencies.push({
      file: mainRsPath,
      issue: 'Missing or unreadable main.rs file'
    });
  } else {
    analysis.totalFiles++;
    await checkFileAgainstTemplate(mainRsPath, mainRsContent, STANDARD_MAIN_RS, analysis, 'main.rs');
  }
} 