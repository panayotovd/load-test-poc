export const options = {
    stages: [
      { duration: '3s', target: 1 }, // Ramp-up
      { duration: '3s', target: 1 },  // Hold
      { duration: '3s', target: 0 }   // Ramp-down
    ],
    thresholds: {
      'http_req_duration': ['p(95)<2000'],  // 95% of requests should complete below 2s
      'http_req_failed': ['rate<0.01']     // Error rate should be less than 1%
    }
  };