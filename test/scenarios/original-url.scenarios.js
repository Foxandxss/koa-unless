module.exports = [
  // 404 scenarios
  { path: ['/foo'], useOriginalUrl: false, testSample: '/it-doesnt-matter', expected: 404 },
  { path: ['/foo'], useOriginalUrl: false, testSample: '/it-doesnt/foot', expected: 404 },

  // 200 scenarios
  { path: ['/else'], useOriginalUrl: false, testSample: '/it-doesnt-matter', expected: 200 },
  { path: ['/something'], useOriginalUrl: false, testSample: '/it-doesnt/matter/something-else', expected: 200 },
];
