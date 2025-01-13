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
  const payload = JSON.stringify({
    id: 0,
    title: `Video ${Math.floor(Math.random() * 1000)}`,
    url: 'https://example.com/videos/sample-video.mp4',
    thumbnailUrl: 'https://example.com/thumbnails/sample-thumbnail.png'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post(`${BASE_URL}/api/v1/Videos`, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200 || r.status === 201,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
