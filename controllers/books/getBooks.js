import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  thresholds: {
    'http_req_duration': ['p(95)<2000'],  // 95% under 2 seconds
    'http_req_failed': ['rate<0.01']     // Less than 1% failure rate
  },
  stages: [
    { duration: '3s', target: 10 },
    { duration: '3s', target: 10 },
    { duration: '3s', target: 0 }
  ]
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Books`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}