module.exports = [
  // 404 scenarios
  { path: [/er$/ig], testSample: '/slower', expected: 404 },
  { path: [/er$/ig], testSample: '/dummier', expected: 404 },
  { path: [/er/ig], testSample: '/ernest', expected: 404 },
  { path: [/er/ig], testSample: '/jerk', expected: 404 },
  { path: ['/foo', /oa/ig], testSample: '/goal', expected: 404 },
  { path: ['/foo', /oa/ig, '/bar'], testSample: '/oauth', expected: 404 },
  { path: ['/foo', /oa$/ig], testSample: '/koa', expected: 404 },
  { path: [/oa$/ig, '/foo', '/etc'], testSample: '/etc', expected: 404 },
  { path: ['/foo', /oa$/ig], testSample: '/foo', expected: 404 },

  // 200 scenarios
  { path: [/er$/ig], testSample: '/shop', expected: 200 },
  { path: [/er$/ig], testSample: '/', expected: 200 },
  { path: [/er$/ig], testSample: '/ernest', expected: 200 },
  { path: [/er/ig], testSample: '/about', expected: 200 },
  { path: [/er/ig], testSample: '/help', expected: 200 },
  { path: ['/foo', /oa/ig], testSample: '/some-url?id=12', expected: 200 },
  { path: ['/foo', /oa$/ig], testSample: '/express', expected: 200 },
  { path: [/oa$/ig, '/foo', '/etc'], testSample: '/koala', expected: 200 },
  { path: [/oa$/ig, '/foo', '/etc'], testSample: '/etcetera', expected: 200 },
  { path: ['/foo', /oa$/ig], testSample: '/foorious', expected: 200 },
];
