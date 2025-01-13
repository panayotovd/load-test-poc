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
    title: `Cover Photo ${Math.floor(Math.random() * 1000)}`,
    url: 'https://example.com/coverphotos/sample-cover.jpg',
    thumbnailUrl: 'https://example.com/thumbnails/sample-thumbnail.jpg'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post(`${BASE_URL}/api/v1/CoverPhotos`, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200 || r.status === 201,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
