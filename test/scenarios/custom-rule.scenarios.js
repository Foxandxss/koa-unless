function denyGuard() {
  return this.url === '/index' || this.url.length === 7;
}

function allowGuard() {
  return this.url === '/a-url-that-doesnt-exist' || this.url.length < 0;
}

module.exports = [
  // 404 scenarios
  { config: denyGuard, testSample: '/index', expected: 404 },
  { config: denyGuard, testSample: '/7-char', expected: 404 },

  // 200 scenarios
  { config: allowGuard, testSample: '/index', expected: 200 },
  { config: allowGuard, testSample: '/7-char', expected: 200 }
];

