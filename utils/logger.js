// 📂 utils/logger.js
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'results/summary.json': JSON.stringify(data),
  };
}

export function logResponse(res) {
  console.log(`Status: ${res.status} | Time: ${res.timings.duration}ms`);
  console.log(`Body: ${res.body.substring(0, 100)}...`);
}