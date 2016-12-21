const unless  = require('../index');
const koa = require('koa');
const request = require('supertest');

module.exports = class TestRunner {
  constructor(testName, scenarios) {
    this.testName = testName;
    this.SCENARIO_PATHS = scenarios;

    this.middleware = function *() {
      this.body = { executed: true };
    };
    this.middleware.unless = unless;
  }

  runTests() {
    let instance = this;

    describe(instance.testName, function () {

      instance.SCENARIO_PATHS.forEach((scenario) => {
        let acceptDeny = scenario.expected == 200 ? 'accept' : 'deny';

        let useOriginalUrl = scenario.useOriginalUrl;
        let config = scenario.config || { path: scenario.path, useOriginalUrl: useOriginalUrl };

        it(`should ${acceptDeny} access to ${scenario.testSample} when configured with: ${config}`, function (done) {
          let app = koa();

          if (!useOriginalUrl) {
            app.use(function *(next) {
              this.url = '/foo';
              yield *next;
            });
          }

          app.use(instance.middleware.unless(config));
          request(app.listen())
            .get(scenario.testSample)
            .expect(scenario.expected, done);
        });
      });
    });
  }
};
