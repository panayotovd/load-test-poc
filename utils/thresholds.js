export const thresholds = {
    'http_req_duration': ['p(95)<2000'],  // 95% of requests < 2s
    'http_req_failed': ['rate<0.01'],    // Error rate < 1%
  };
  
  export function getThresholds(customThresholds) {
    return {
      ...thresholds,
      ...customThresholds,
    };
  }