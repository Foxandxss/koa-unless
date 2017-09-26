module.exports = [
  // 404 scenarios
  {path: [ {url: '/foo', method: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ {url: '/bar', method: ['GET', 'POST'] }], testSample: '/bar', expected: 404},
  {path: [ {url: '/bar', method: ['POST', 'GET'] }, '/foo'], testSample: '/bar', expected: 404},
  {path: [ '/bar', {url: '/foo', method: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ '/bar', '/etc', {url: '/foo', method: 'GET' }], testSample: '/foo', expected: 404},
  {path: [ '/bar', {url: '/etc', method: 'GET' }, '/foo'], testSample: '/etc', expected: 404},

  // 200 scenarios
  {path: [ {url: '/foo', method: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ {url: '/bar', method: 'POST' }], testSample: '/bar', expected: 200},
  {path: [ {url: '/bar', method: 'POST' }, '/foo'], testSample: '/bar', expected: 200},
  {path: [ '/bar', {url: '/foo', method: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ '/bar', '/etc', {url: '/foo', method: 'POST' }], testSample: '/foo', expected: 200},
  {path: [ '/bar', {url: '/etc', method: 'POST' }, '/foo'], testSample: '/etc', expected: 200}
];
