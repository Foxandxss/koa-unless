module.exports = [
  // 404 scenarios
  { config: { method: ['GET', 'OPTIONS'] }, testMethod: 'get', testSample: '/index.html', expected: 404 },
  { config: { method: ['GET', 'OPTIONS'] }, testMethod: 'options', testSample: '/any-url', expected: 404 },
  { config: { method: ['POST'] }, testMethod: 'post', testSample: '/any-url?query-string=123', expected: 404 },

  // 200 scenarios
  { config: { method: ['GET', 'OPTIONS'] }, testMethod: 'post', testSample: '/index.html', expected: 200 },
  { config: { method: ['GET', 'OPTIONS'] }, testMethod: 'delete', testSample: '/any-url', expected: 200 },
  { config: { method: ['POST'] }, testMethod: 'get', testSample: '/any-url?query-string=123', expected: 200 },
];
