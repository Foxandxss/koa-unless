module.exports = [
  // 404 scenarios
  { path: ['/foo'], dontUseOriginalUrl: true, testSample: '/it-doesnt-matter', expected: 404 },
  { path: ['/foo'], dontUseOriginalUrl: true, testSample: '/it-doesnt/foot', expected: 404 },

  // 200 scenarios
  { path: ['/else'], dontUseOriginalUrl: true, testSample: '/it-doesnt-matter', expected: 200 },
  { path: ['/something'], dontUseOriginalUrl: true, testSample: '/it-doesnt/matter/something-else', expected: 200 },
];
