// 📂 scripts/generateReport.js
const reportData = JSON.parse(fs.readFileSync('./results/latestResults.json'));

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
        th { background-color:rgb(0, 0, 0); }
        .pass { background-color:rgb(51, 148, 74); }
        .fail { background-color:rgb(205, 23, 38); }
    </style>
</head>
<body>
    <h1>API Load Test Report</h1>
    <table>
        <tr>
            <th>Metric</th>
            <th>Average (ms)</th>
            <th>95th Percentile (ms)</th>
        </tr>
        <tr>
            <td>Response Time</td>
            <td>${reportData.metrics.http_req_duration.avg}</td>
            <td>${reportData.metrics.http_req_duration["p(95)"]}</td>
        </tr>
    </table>
    <p>Status: ${reportData.status}</p>
</body>
</html>
`;