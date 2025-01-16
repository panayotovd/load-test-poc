const fs = require('fs');
const path = require('path');

const executionDate = new Date().toLocaleString();
let reportSections = '';

// Dynamically find all Books result JSON files in the results folder
function getResultFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('_results.json'))
    .map(file => path.join(dir, file));
}

const resultFiles = getResultFiles('./results');

if (resultFiles.length === 0) {
  console.error('❌ No result files found in ./results. Run tests before generating the report.');
  process.exit(1);
}

resultFiles.forEach(filePath => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const endpointName = path.basename(filePath, '_results.json');

    const avgResponseTime = data.metrics?.http_req_duration?.values.avg;
    const percentile95 = data.metrics?.http_req_duration?.values['p(95)'] ?? 'N/A';
    const maxResponseTime = data.metrics?.http_req_duration?.values.max ?? 'N/A';
    const errorRateRaw = data.metrics?.http_req_failed?.rate;
    const errorRate = isNaN(errorRateRaw) || errorRateRaw === undefined ? 0 : (errorRateRaw * 100).toFixed(2);

    const status = errorRate <= 1 ? 'PASS' : 'FAIL';
    const statusClass = errorRate <= 1 ? 'pass' : 'fail';

    reportSections += `
      <h2>Endpoint: ${endpointName}</h2>
      <table>
          <tr>
              <th>Metric</th>
              <th>Value</th>
          </tr>
          <tr>
              <td>Average Response Time (ms)</td>
              <td>${avgResponseTime.toFixed(2)}</td>
          </tr>
          <tr>
              <td>95th Percentile (ms)</td>
              <td>${percentile95.toFixed(2)}</td>
          </tr>
          <tr>
              <td>Max Response Time (ms)</td>
              <td>${maxResponseTime.toFixed(2)}</td>
          </tr>
          <tr>
              <td>Error Rate (%)</td>
              <td>${errorRate}%</td>
          </tr>
          <tr class="${statusClass}">
              <td>Status</td>
              <td>${status}</td>
          </tr>
      </table>
      <hr>
    `;
  } catch (error) {
    console.error(`❌ Failed to process result file: ${filePath}`, error.message);
  }
});

// Generate dynamic HTML report
const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Load Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h1>Books API Load Test Report</h1>
    <p><strong>Date of Execution:</strong> ${executionDate}</p>
    ${reportSections}
</body>
</html>
`;

// Write the dynamic report to an HTML file
fs.writeFileSync('./results/report.html', reportHtml);
console.log('📊 Dynamic HTML report generated successfully for all Books operations.');