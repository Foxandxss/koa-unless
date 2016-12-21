module.exports = [
  // 404 scenarios
  {path: ['/foo'], testSample: '/foo', expected: 404},
  {path: ['/bar'], testSample: '/bar', expected: 404},
  {path: ['/bar', '/foo'], testSample: '/bar', expected: 404},
  {path: ['/bar', '/foo'], testSample: '/foo', expected: 404},
  {path: ['/bar', '/etc', '/foo'], testSample: '/foo', expected: 404},
  {path: ['/bar', '/etc', '/foo'], testSample: '/etc', expected: 404},

  // 200 scenarios
  {path: ['/foo'], testSample: '/else', expected: 200},
  {path: ['/bar'], testSample: '/foo', expected: 200},
  {path: ['/bar', '/foo'], testSample: '/etc', expected: 200},
  {path: ['/bar', '/foo'], testSample: '/cool', expected: 200},
  {path: ['/bar', '/etc', '/foo'], testSample: '/help', expected: 200},
  {path: ['/bar', '/etc', '/foo'], testSample: '/twohundred', expected: 200}
];
