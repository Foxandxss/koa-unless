'use strict';

const unless  = require('../index');
const koa = require('koa');
const request = require('supertest');

module.exports = runTests;

function runTests(testName, scenariosPath) {
  let middleware = function *() {
    this.body = { executed: true };
  };

  middleware.unless = unless;

  describe(testName, function () {

    require(scenariosPath).forEach((scenario) => {
      let acceptDeny = scenario.expected == 200 ? 'accept' : 'deny';

      let dontUseOriginalUrl = scenario.dontUseOriginalUrl;
      let config = scenario.config || { path: scenario.path, useOriginalUrl: !dontUseOriginalUrl };

      let testMethod = scenario.testMethod || 'get';

      it(`should ${acceptDeny} access to ${scenario.testSample} when configured with: ${config}`, function (done) {
        let app = koa();

        if (dontUseOriginalUrl) {
          app.use(function *(next) {
            this.url = '/foo';
            yield *next;
          });
        }

        app.use(middleware.unless(config));
        request(app.listen())[testMethod](scenario.testSample)
          .expect(scenario.expected, done);
      });
    });
  });
}
