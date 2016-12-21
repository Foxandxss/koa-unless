const unless  = require('../../index');
const koa = require('koa');
const request = require('supertest');

const PATH_MATCH_SCENARIOS = require('./path-match.scenarios');

describe('with PATH exception', function () {

  beforeEach(function() {
    middleware = function *() {
      this.body = { executed: true };
    };

    middleware.unless = unless;
  });

  PATH_MATCH_SCENARIOS.forEach((scenario) => {
    let acceptDeny = scenario.expected == 200 ? 'accept' : 'deny';

    it(`should ${acceptDeny} access to ${scenario.testSample} when configured with: ${scenario.path}`, function (done) {
      let app = koa();

      app.use(middleware.unless({ path: scenario.path }));
      request(app.listen())
          .get(scenario.testSample)
          .expect(scenario.expected, done);
    });
  });
});
