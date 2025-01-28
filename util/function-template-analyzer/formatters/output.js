export function formatResults(analysis) {
  console.log('\nAnalysis Results:');
  console.log(`Total files analyzed: ${analysis.totalFiles}`);
  
  if (analysis.inconsistencies.length > 0) {
    // Group inconsistencies by issue type
    const groupedIssues = new Map();
    
    analysis.inconsistencies.forEach(({file, issue, expected, found, fix}) => {
      if (!groupedIssues.has(issue)) {
        groupedIssues.set(issue, []);
      }
      groupedIssues.get(issue).push({file, expected, found, fix});
    });

    console.log('\nTemplate Inconsistencies:');
    // Sort issues by type
    const sortedIssues = Array.from(groupedIssues.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    sortedIssues.forEach(([issueType, occurrences]) => {
      console.log(`\n${issueType}:`);
      occurrences.forEach(({file, expected, found, fix}) => {
        console.log(`  - ${file}`);
        if (expected && found) {
          console.log('    Expected:');
          console.log(`    ${expected}`);
          console.log('    Found:');
          console.log(`    ${found}`);
        }
        if (fix) {
          console.log(`    Fix: ${fix}`);
        }
      });
    });
  }

  if (analysis.lineDiscrepancies.length > 0) {
    console.log('\nLine Discrepancies:');
    let currentFile = '';
    analysis.lineDiscrepancies.forEach(({file, line, expected, issue}) => {
      if (currentFile !== file) {
        console.log(`\n${file}:`);
        currentFile = file;
      }
      if (expected) {
        console.log(`  - ${issue}:`);
        console.log(`    Found:    ${line}`);
        console.log(`    Expected: ${expected}`);
      } else {
        console.log(`  - ${issue}: ${line || '[empty line]'}`);
      }
    });
  }
} 