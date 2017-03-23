module.exports = [
  // 404 scenarios
  { path: [/er$/i], testSample: '/slower', expected: 404 },
  { path: [/er$/i], testSample: '/dummier', expected: 404 },
  { path: [/er/i], testSample: '/ernest', expected: 404 },
  { path: [/er/i], testSample: '/jerk', expected: 404 },
  { path: ['/foo', /oa/i], testSample: '/goal', expected: 404 },
  { path: ['/foo', /oa/i, '/bar'], testSample: '/oauth', expected: 404 },
  { path: ['/foo', /oa$/i], testSample: '/koa', expected: 404 },
  { path: [/oa$/i, '/foo', '/etc'], testSample: '/etc', expected: 404 },
  { path: ['/foo', /oa$/i], testSample: '/foo', expected: 404 },

  // 200 scenarios
  { path: [/er$/i], testSample: '/shop', expected: 200 },
  { path: [/er$/i], testSample: '/', expected: 200 },
  { path: [/er$/i], testSample: '/ernest', expected: 200 },
  { path: [/er/i], testSample: '/about', expected: 200 },
  { path: [/er/i], testSample: '/help', expected: 200 },
  { path: ['/foo', /oa/i], testSample: '/some-url?id=12', expected: 200 },
  { path: ['/foo', /oa$/i], testSample: '/express', expected: 200 },
  { path: [/oa$/i, '/foo', '/etc'], testSample: '/koala', expected: 200 },
  { path: [/oa$/i, '/foo', '/etc'], testSample: '/etcetera', expected: 200 },
  { path: ['/foo', /oa$/i], testSample: '/foorious', expected: 200 },
];
