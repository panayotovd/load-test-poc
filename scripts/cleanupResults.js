const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, '../results');

// Keep these files
const keepList = [
  'baseline.json',
  'latestResults.json',
  'report.html',
];

// Delete everything else that matches *Results.json
// (or you can do a more general approach to delete everything except keepList)
try {
  const files = fs.readdirSync(resultsDir);

  files.forEach((file) => {
    const fullPath = path.join(resultsDir, file);

    // If it ends with Results.json and is NOT in keepList, delete
    if (file.endsWith('Results.json') && !keepList.includes(file)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted old results file: ${file}`);
    }
  });

  console.log('✅ Results directory cleanup complete.');
} catch (err) {
  console.error('❌ Error during cleanup:', err.message);
  process.exit(1);
}
