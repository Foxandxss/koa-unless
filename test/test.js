var koa     = require('koa');
var request = require('supertest');

var unless  = require('../index');

describe('koa-unless', function() {
  var middleware;

  beforeEach(function() {
    middleware = function *(next) {
      this.body = {executed: true};
    };

    middleware.unless = unless;
  });

  describe('with PATH exception', function() {
    it('should not call the middleware when one of the path match', function(done) {
      var app = koa();

      app.use(middleware.unless({ path: ['/foo'] }));
      request(app.listen())
        .get('/foo')
        .expect(404, done);
    });

    it('should call the middleware when the path doesnt match', function(done) {
      var app = koa();

      app.use(middleware.unless({ path: ['/foo'] }));
      request(app.listen())
        .get('/bar')
        .expect(200, done);
    });
  });

  describe('with PATH (regexp) exception', function() {
    it('should not call the middleware when the regex match', function(done) {
      var app = koa();

      app.use(middleware.unless({ path: ['/foo', /ar$/ig] }));
      request(app.listen())
        .get('/bar')
        .expect(404, done);
    });
  });

  describe('with PATH (useOriginalUrl) exception', function() {
    it('should not call the middleware when one of the path match this.url instead of this.originalUrl', function(done) {
      var app = koa();

      app.use(function *(next) {
        this.url = '/foo';
        yield *next;
      });
      app.use(middleware.unless({ path: ['/foo'], useOriginalUrl: false }));
      request(app.listen())
        .get('/orig/foo')
        .expect(404, done);
    });

    it('should call the middleware when the path doesnt match this.url even if path matches this.originalUrl', function(done) {
      var app = koa();

      app.use(function *(next) {
        this.originalUrl = '/foo';
        yield *next;
      });
      app.use(middleware.unless({ path: ['/foo'], useOriginalUrl: false }));
      request(app.listen())
        .get('/bar')
        .expect(200, done);
    });
  });

  describe('with EXT exception', function() {
    it('should not call the middleware when the ext match', function(done) {
      var app = koa();

      app.use(middleware.unless({ ext: ['html', 'css'] }));
      request(app.listen())
        .get('/index.html')
        .expect(404, done);
    });

    it('should call the middleware when the ext doesnt match', function(done) {
      var app = koa();

      app.use(middleware.unless({ ext: ['html', 'css'] }));
      request(app.listen())
        .get('/index.js')
        .expect(200, done);
    });
  });

  describe('with METHOD exception', function() {
    it('should not call the middleware when the method match', function(done) {
      var app = koa();

      app.use(middleware.unless({ method: ['GET', 'OPTIONS'] }));
      request(app.listen())
        .get('/index')
        .expect(404, done);
    });

    it('should call the middleware when the method doesnt match', function(done) {
      var app = koa();

      app.use(middleware.unless({ method: ['GET', 'OPTIONS'] }));
      request(app.listen())
        .post('/index')
        .expect(200, done);
    });
  });

  describe('with custom exception', function() {
    it('should not call the middleware when the custom rule match', function(done) {
      var app = koa();

      app.use(middleware.unless(function() {
        return this.url === '/index';
      }));
      request(app.listen())
        .get('/index')
        .expect(404, done);
    });

    it('should call the middleware when the custom rule doesnt match', function(done) {
      var app = koa();

      app.use(middleware.unless(function() {
        return this.url === '/index';
      }));
      request(app.listen())
        .get('/home')
        .expect(200, done);
    });
  });
});