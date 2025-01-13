// 📂 utils/dataGenerator.js
import { randomSeed, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

randomSeed(12345); // Ensures reproducibility

export function generateRandomBook() {
  return {
    id: 0,
    title: `Book Title ${randomIntBetween(1, 1000)}`,
    description: 'Auto-generated book description',
    pageCount: randomIntBetween(50, 500),
    excerpt: 'Sample excerpt content...',
    publishDate: new Date().toISOString(),
  };
}

export function generateRandomUser() {
  return {
    id: 0,
    userName: `User_${randomIntBetween(1, 10000)}`,
    password: 'P@ssw0rd!',
  };
}