import { execSync } from 'child_process';

const smokeTests = [
  'tests/smoke/smokeTestBooks.js',
  'tests/smoke/smokeTestUsers.js'
  //'tests/smoke/smokeTestAuthors.js'
];

console.log('🚀 Running Smoke Tests...');

smokeTests.forEach((test) => {
  try {
    console.log(`\nRunning: ${test}`);
    execSync(`k6 run ${test}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Test failed: ${test}`);
    process.exit(1);
  }
});

console.log('✅ All Smoke Tests Passed!');