var url = require('url');

module.exports = function(options) {
  var parent = this;

  var opts = typeof options === 'function' ? {custom: options} : options;
  opts.useOriginalUrl = (typeof opts.useOriginalUrl === 'undefined') ? true : opts.useOriginalUrl;

  return function *(next) {
    var requestedUrl = url.parse((opts.useOriginalUrl ? this.originalUrl : this.url) || '', true);

    var skip = false;

    if (opts.custom) {
      skip = skip || opts.custom.call(this);
    }

    var paths = !opts.path || Array.isArray(opts.path) ?
                opts.path : [opts.path];

    if (paths) {
      skip = skip || paths.some(function(p) {
        return (typeof p === 'string' && p === requestedUrl.pathname) ||
          (p instanceof RegExp && !! p.exec(requestedUrl.pathname));
      });
    }

    var exts = !opts.ext || Array.isArray(opts.ext) ?
               opts.ext : [opts.ext];

    if (exts) {
      skip = skip || exts.some(function(ext) {
         return requestedUrl.pathname.substr(ext.length * -1) === ext;
      });
    }

    var methods = !opts.method || Array.isArray(opts.method) ?
                  opts.method : [opts.method];

    if (methods) {
      skip = skip || !!~methods.indexOf(this.method);
    }

    if (skip) {
      return yield *next;
    }

    yield *parent.call(this, next);
  };
};