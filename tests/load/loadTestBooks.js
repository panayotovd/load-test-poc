// 📂 tests/load/loadTestBooks.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  stages: [
    { duration: '1m', target: 20 },  // Ramp-up to 20 VUs
    { duration: '3m', target: 20 },  // Stay at 20 VUs
    { duration: '1m', target: 0 },   // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Books`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}