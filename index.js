/**
 * Koa unless middleware. Attach to any middleware and configure it to prevent/permit the
 * middleware in question to be executed.
 *
 * @module koa-unless
 */

'use strict';
var url = require('url');

/** Creates a wrapper middleware that verifies if the original middleware should be skipped. */
module.exports = function (options) {
  var originalMiddleware = this;

  // If a custom function was passed directly, creates a new object literal that holds it as a property called custom.
  var opts = typeof options === 'function' ? { custom: options } : options;
  opts.useOriginalUrl = (typeof opts.useOriginalUrl === 'undefined') ? true : opts.useOriginalUrl;

  // Returns the middleware that wraps the original one.
  return function (ctx, next) {

    // any match means 'skip original middleware'
    if (matchesCustom(ctx, opts) || matchesPath(ctx, opts) ||
        matchesExtension(ctx, opts) || matchesMethod(ctx.method, opts)) {
      return next();
    }

    return originalMiddleware(ctx, next);
  };
};

/**
 * Returns requested URL
 *
 * @param ctx - Koa context
 * @param opts - unless configuration
 * @returns {string}
 */
function getRequestedUrl(ctx, opts) {
  return url.parse((opts.useOriginalUrl ? ctx.originalUrl : ctx.url) || '', true);
}

/**
 * Returns boolean indicating whether the requestedUrl matches
 *
 * @param ctx - Koa context
 * @param opts - unless configuration
 * @returns {boolean}
 */
function isUrlMatch(path, requestedUrl) {
  var ret = (typeof path === 'string' && path === requestedUrl.pathname) ||
    (path instanceof RegExp && !!path.exec(requestedUrl.pathname));

  if (path instanceof RegExp) {
    path.lastIndex = 0;
  }

  if (path && path.url) {
    ret = isUrlMatch(path.url, requestedUrl)
  }
  return ret;
}

/**
 * Returns boolean indicating whether the custom function returns true.
 *
 * @param ctx - Koa context
 * @param opts - unless configuration
 * @returns {boolean}
 */
function matchesCustom(ctx, opts) {
  if (opts.custom) {
    return opts.custom(ctx);
  }
  return false;
}

/**
 * Returns boolean indicating whether the requestUrl matches against the paths configured.
 *
 * @param requestedUrl - url requested by user
 * @param opts - unless configuration
 * @returns {boolean}
 */
function matchesPath(ctx, opts) {
  var paths = !opts.path || Array.isArray(opts.path) ?
    opts.path : [opts.path];

  if (paths) {
    var requestedUrl = getRequestedUrl(ctx, opts);
    return paths.some(function(p) {

      var matches = isUrlMatch(p, requestedUrl)
      if (!p.methods) return matches;
      return matches && matchesMethod(ctx.method, { method: p.methods });
    });
  }

  return false;
}

/**
 * Returns boolean indicating whether the requestUrl ends with the configured extensions.
 *
 * @param requestedUrl - url requested by user
 * @param opts - unless configuration
 * @returns {boolean}
 */
function matchesExtension(ctx, opts) {
  var exts = !opts.ext || Array.isArray(opts.ext) ?
    opts.ext : [opts.ext];

  if (exts) {
    var requestedUrl = getRequestedUrl(ctx, opts);
    return exts.some(function(ext) {
      return requestedUrl.pathname.substr(ext.length * -1) === ext;
    });
  }
}

/**
 * Returns boolean indicating whether the request method matches the configured methods.
 *
 * @param method - method used (GET, POST, ...)
 * @param opts - unless configuration
 * @returns {boolean}
 */
function matchesMethod(method, opts) {
  var methods = !opts.method || Array.isArray(opts.method) ?
    opts.method : [opts.method];

  if (methods) {
    return !!~methods.indexOf(method);
  }
}
