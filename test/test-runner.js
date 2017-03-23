'use strict';

const unless  = require('../index');
const Koa = require('koa');
const request = require('supertest');

module.exports = runTests;


function runTests(testName, scenariosPath) {
  let middleware = function(ctx, next) {
    ctx.body = { executed: true };
    return next();
  };

  middleware.unless = unless;

  describe(testName, function () {

    require(scenariosPath).forEach((scenario) => {
      let acceptDeny = scenario.expected == 200 ? 'accept' : 'deny';

      let dontUseOriginalUrl = scenario.dontUseOriginalUrl;
      let config = scenario.config || { path: scenario.path, useOriginalUrl: !dontUseOriginalUrl };
      let readableConfig = typeof config === 'function' ? config.name : JSON.stringify(config);
      let testMethod = scenario.testMethod || 'get';

      it(`should ${acceptDeny} access to ${scenario.testSample} when configured with: ${readableConfig}`, function (done) {
        let app = new Koa();

        if (dontUseOriginalUrl) {
          app.use(function(ctx, next) {
            ctx.url = '/foo';
            return next();
          });
        }

        app.use(middleware.unless(config));
        request(app.listen())[testMethod](scenario.testSample)
          .expect(scenario.expected, done);
      });
    });
  });
}
