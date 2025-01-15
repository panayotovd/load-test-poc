import { readFileSync } from 'fs';

const baseline = JSON.parse(readFileSync('./results/baseline.json'));
const latestResults = JSON.parse(readFileSync('./results/latestResults.json'));

let isPass = true;

Object.keys(baseline.endpoints).forEach((endpoint) => {
  const baselineAvg = baseline.endpoints[endpoint].avg_response_time;
  const baselineP95 = baseline.endpoints[endpoint].p95_response_time;
  const latestAvg = latestResults.metrics.http_req_duration.avg;
  const latestP95 = latestResults.metrics.http_req_duration["p(95)"];

  if (latestAvg > baselineAvg || latestP95 > baselineP95) {
    console.error(`Performance regression detected on ${endpoint}`);
    isPass = false;
  } else {
    console.log(`${endpoint} passed performance comparison.`);
  }
});

if (!isPass) process.exit(1);