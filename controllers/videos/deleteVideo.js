import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';

export const options = {
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'http_req_failed': ['rate<0.01']
  }
};

export default function () {
  const videoId = Math.floor(Math.random() * 10) + 1;  // Random video ID between 1-10
  const res = http.del(`${BASE_URL}/api/v1/Videos/${videoId}`);

  check(res, {
    'status is 200': (r) => r.status === 200 || r.status === 204,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
