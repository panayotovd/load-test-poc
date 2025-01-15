const initialBaseline = {
    endpoints: {
      "/api/v1/Books": {
        avg_response_time: 0,
        p95_response_time: 0
      },
      "/api/v1/Users": {
        avg_response_time: 0,
        p95_response_time: 0
      }
    }
  };
  
  if (!fs.existsSync('./results/baseline.json')) {
    fs.writeFileSync('./results/baseline.json', JSON.stringify(initialBaseline, null, 2));
    console.log('Baseline initialized.');
  } else {
    console.log('Baseline already exists.');
  }