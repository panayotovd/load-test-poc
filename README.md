## 📂 Project Structure
```
k6-fakerestapi-load-tests/
├── controllers/      # API-specific test scripts
├── tests/            # Organized smoke, load, and stress tests
├── utils/            # Helper scripts (HTTP, data generation, logging)
├── data/             # Static test data (JSON)
├── results/          # Test outputs and reports
├── scripts/          # Automation scripts
├── package.json      # Node.js configuration
├── k6.config.js      # k6 test configuration
└── README.md         # Project documentation
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run a Smoke Test
```bash
npm run test
```

### 3. Compare Results
```bash
npm run compare
```

### 4. Update Baseline
```bash
npm run update-baseline
```

### 5. Generate HTML Report
```bash
npm run generate-report
```

## 📊 Performance Thresholds
- 95% of requests must complete in **< 2 seconds**.
- Error rate must be **< 1%**.

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push the branch and open a Pull Request.