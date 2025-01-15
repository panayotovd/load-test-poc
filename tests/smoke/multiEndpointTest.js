import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  scenarios: {
    booksScenario: {
      executor: 'shared-iterations',
      exec: 'testBooks',
      vus: 1,
      iterations: 3,
    },
    authorsScenario: {
      executor: 'shared-iterations',
      exec: 'testAuthors',
      vus: 1,
      iterations: 3,
      startTime: '3s', // start after books scenario
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

// Scenario 1: Books
export function testBooks() {
  const res = http.get('https://fakerestapi.azurewebsites.net/api/v1/Books');
  check(res, {
    'Books responded 200': (r) => r.status === 200,
  });
}

// Scenario 2: Authors
export function testAuthors() {
  const res = http.get('https://fakerestapi.azurewebsites.net/api/v1/Authors');
  check(res, {
    'Authors responded 200': (r) => r.status === 200,
  });
}

// After all scenarios finish, handleSummary() runs once.
// We write scenario-specific JSON files (e.g. BooksResults, AuthorsResults).
export function handleSummary(data) {
  return {
    // Standard console output
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),

    // Separate JSON for each scenario
    '../../results/BooksResults.json': JSON.stringify(
      filterScenarioData(data, 'booksScenario'),
      null,
      2
    ),
    '../../results/AuthorsResults.json': JSON.stringify(
      filterScenarioData(data, 'authorsScenario'),
      null,
      2
    ),
  };
}

// Extract sub-metrics for a given scenario.
function filterScenarioData(data, scenarioName) {
  const scenarioMetrics = {};

  for (const [metricName, metricObj] of Object.entries(data.metrics)) {
    // Try to find a submetric whose tag set includes `scenario:booksScenario` or `scenario:authorsScenario`
    const scenarioTagKey = Object.keys(metricObj.submetrics).find((tagSet) =>
      tagSet.includes(`scenario:${scenarioName}`)
    );
    if (scenarioTagKey) {
      scenarioMetrics[metricName] = metricObj.submetrics[scenarioTagKey];
    }
  }

  return { scenario: scenarioName, metrics: scenarioMetrics };
}
