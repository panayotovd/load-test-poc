// 📂 k6.config.js
export const options = {
    stages: [
      { duration: '30s', target: 10 }, // Ramp-up
      { duration: '1m', target: 10 },  // Hold
      { duration: '30s', target: 0 }   // Ramp-down
    ],
    thresholds: {
      'http_req_duration': ['p(95)<2000'],  // 95% of requests should complete below 2s
      'http_req_failed': ['rate<0.01']     // Error rate should be less than 1%
    }
  };