import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  vus: 1,
  duration: '3s',
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/Users`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });
}