const latestData = JSON.parse(fs.readFileSync('./results/latestResults.json'));
const updatedBaseline = {
  endpoints: {
    "/api/v1/Books": {
      avg_response_time: latestData.metrics.http_req_duration.avg,
      p95_response_time: latestData.metrics.http_req_duration["p(95)"]
    },
    "/api/v1/Users": {
      avg_response_time: latestData.metrics.http_req_duration.avg,
      p95_response_time: latestData.metrics.http_req_duration["p(95)"]
    }
  }
};

fs.writeFileSync('./results/baseline.json', JSON.stringify(updatedBaseline, null, 2));
console.log('Baseline updated successfully.');