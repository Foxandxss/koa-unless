module.exports = [
  // 404 scenarios
  { config: { ext: ['html', 'css'] }, testSample: '/index.html', expected: 404 },
  { config: { ext: ['html', 'css'] }, testSample: '/some-file.css', expected: 404 },
  { config: { ext: ['html', 'css'] }, testSample: '/some-folder/some-file.css', expected: 404 },
  { config: { ext: ['js', 'png'] }, testSample: '/some-file.png', expected: 404 },
  { config: { ext: ['js', 'png'] }, testSample: '/some-folder/some-file.js', expected: 404 },

  // 200 scenarios
  { config: { ext: ['html', 'css'] }, testSample: '/some-path?queryString=style.css', expected: 200 },
  { config: { ext: ['html', 'css'] }, testSample: '/html-is-awesome', expected: 200 },
  // FIXME this scenario should be 200:
  // { config: { ext: ['js', 'png'] }, testSample: '/i-like-png', expected: 200 },
  { config: { ext: ['js', 'png'] }, testSample: '/some-folder/some-file.jsx', expected: 200 }
];
