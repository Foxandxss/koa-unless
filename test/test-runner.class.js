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

        it(`should ${acceptDeny} access to ${scenario.testSample} when configured with: ${scenario.path}`, function (done) {
          let app = koa();

          let useOriginalUrl = scenario.useOriginalUrl;
          if (!useOriginalUrl) {
            app.use(function *(next) {
              this.url = '/foo';
              yield *next;
            });
          }

          app.use(instance.middleware.unless({ path: scenario.path, useOriginalUrl: useOriginalUrl }));
          request(app.listen())
            .get(scenario.testSample)
            .expect(scenario.expected, done);
        });
      });
    });
  }
};
