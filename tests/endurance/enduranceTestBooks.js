// 📂 tests/endurance/enduranceTestBooks.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  stages: [
    { duration: '5m', target: 20 },  // Ramp-up to 20 VUs
    { duration: '30m', target: 20 }, // Maintain 20 VUs
    { duration: '5m', target: 0 },   // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<3000'],  // 95% of requests below 3s
    'http_req_failed': ['rate<0.01'],     // Error rate below 1%
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Books`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 3s': (r) => r.timings.duration < 3000,
  });
  sleep(1);
}