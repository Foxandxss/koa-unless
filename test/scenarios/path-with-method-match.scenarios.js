module.exports = [
  // 404 scenarios
  {path: [ {url: '/foo', methods: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ {url: '/bar', methods: ['GET', 'POST'] }], testSample: '/bar', expected: 404},
  {path: [ {url: '/bar', methods: ['POST', 'GET'] }, '/foo'], testSample: '/bar', expected: 404},
  {path: [ '/bar', {url: '/foo', methods: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ '/bar', '/etc', {url: '/foo', methods: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ '/bar', {url: '/etc', methods: 'GET' }, '/foo'], testSample: '/etc', expected: 404},

  // 200 scenarios
  {path: [ {url: '/foo', methods: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ {url: '/bar', methods: 'POST' }], testSample: '/bar', expected: 200},
  {path: [ {url: '/bar', methods: 'POST' }, '/foo'], testSample: '/bar', expected: 200},
  {path: [ '/bar', {url: '/foo', methods: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ '/bar', '/etc', {url: '/foo', methods: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ '/bar', {url: '/etc', methods: 'POST' }, '/foo'], testSample: '/etc', expected: 200}
];
