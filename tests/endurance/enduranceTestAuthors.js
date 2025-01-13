// 📂 tests/endurance/enduranceTestAuthors.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  stages: [
    { duration: '5m', target: 20 },
    { duration: '30m', target: 20 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<3000'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Authors`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 3s': (r) => r.timings.duration < 3000,
  });
  sleep(1);
}