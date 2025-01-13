// 📂 utils/httpHelper.js
import http from 'k6/http';

export function getRequest(url, params = {}) {
  return http.get(url, params);
}

export function postRequest(url, payload, params = {}) {
  return http.post(url, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
    ...params,
  });
}

export function deleteRequest(url, params = {}) {
  return http.del(url, null, params);
}

// Retry logic for unstable endpoints
export function retryRequest(requestFunc, retries = 3, delay = 1) {
  for (let i = 0; i < retries; i++) {
    const res = requestFunc();
    if (res.status === 200) return res;
    sleep(delay);
  }
  throw new Error('Request failed after retries');
}