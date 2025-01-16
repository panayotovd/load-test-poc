import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../utils/envLoader.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  scenarios: {
    get_all_books: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      exec: 'getAllBooksScenario',
      startTime: '0s',
    },
    create_books: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      exec: 'createBooksScenario',
      startTime: '5s',
    },
    get_book_by_id: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      exec: 'getBookByIdScenario',
      startTime: '10s',
    },
    delete_books: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      exec: 'deleteBooksScenario',
      startTime: '15s',
    },
  },
};

let createdBookIds = [];

// 📚 Scenario: GET all books
export function getAllBooksScenario() {
  const res = http.get(`${BASE_URL}/api/v1/Books`);
  check(res, {
    'GET /Books status is 200': (r) => r.status === 200,
    'GET /Books response time < 1s': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}

// 📚 Scenario: POST (create) books
export function createBooksScenario() {
  const customId = Math.floor(Math.random() * 100000);

  const payload = JSON.stringify({
    id: customId,
    title: `Scenario Book ${Math.random()}`,
    description: 'Scenario-based automated book creation',
    pageCount: Math.floor(Math.random() * 500) + 100,
    excerpt: 'Generated excerpt for testing',
    publishDate: new Date().toISOString(),
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Ensure JSON response
    },
  };

  const res = http.post(`${BASE_URL}/api/v1/Books`, payload, params);

  // 🔍 Debug: Log the full response to understand why ID is missing
  console.log(`📥 Response Body: ${res.body}`);
  console.log(`📊 Status: ${res.status}`);

  check(res, {
    'POST /Books status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  // ✅ Try capturing the ID more robustly
  const responseData = res.json();
  let createdId = null;

  if (responseData && responseData.id) {
    createdId = responseData.id;
  } else if (responseData && responseData.Id) {
    createdId = responseData.Id;
  }

  if (createdId) {
    createdBookIds.push(createdId);
    console.log(`✅ Book created with ID: ${createdId}`);
  } else {
    console.error('❌ Failed to capture book ID. Response:', JSON.stringify(responseData));
  }

  sleep(1);
}

console.log(createdBookIds);

// 📚 Scenario: GET book by ID
export function getBookByIdScenario() {
  if (createdBookIds.length === 0) {
    console.warn('⚠️ No created book IDs available for GET by ID.');
    return;
  }
  const bookId = createdBookIds[Math.floor(Math.random() * createdBookIds.length)];
  const res = http.get(`${BASE_URL}/api/v1/Books/${bookId}`);
  check(res, {
    [`GET /Books/${bookId} status is 200`]: (r) => r.status === 200,
  });
  sleep(1);
}

// 📚 Scenario: DELETE created books
export function deleteBooksScenario() {
  if (createdBookIds.length === 0) {
    console.warn('⚠️ No created book IDs available for DELETE.');
    return;
  }
  const bookId = createdBookIds.pop();
  const res = http.del(`${BASE_URL}/api/v1/Books/${bookId}`);
  check(res, {
    [`DELETE /Books/${bookId} status is 200 or 204`]: (r) => r.status === 200 || r.status === 204,
  });
  console.log(`🗑️ Deleted Book ID: ${bookId}`);
  sleep(1);
}

// 📤 Export all created book IDs for later reference
export function handleSummary(data) {
  return {
    'results/getAllBooks_results.json': JSON.stringify(data),
    'results/createBooks_results.json': JSON.stringify(data),
    'results/getBookById_results.json': JSON.stringify(data),
    'results/deleteBooks_results.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}