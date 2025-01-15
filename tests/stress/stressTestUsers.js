import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<4000'],
    'http_req_failed': ['rate<0.05'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Users`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 4s': (r) => r.timings.duration < 4000,
  });
  sleep(1);
}