function denyGuard(ctx) {
  return ctx.url === '/index' || ctx.url.length === 7;
}

function allowGuard(ctx) {
  return ctx.url === '/a-url-that-doesnt-exist' || ctx.url.length < 0;
}

module.exports = [
  // 404 scenarios
  { config: denyGuard, testSample: '/index', expected: 404 },
  { config: denyGuard, testSample: '/7-char', expected: 404 },

  // 200 scenarios
  { config: allowGuard, testSample: '/index', expected: 200 },
  { config: allowGuard, testSample: '/7-char', expected: 200 }
];

