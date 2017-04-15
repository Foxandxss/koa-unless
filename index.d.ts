import Koa = require("koa");

declare type booleanReturn = (args?: any) => boolean;

declare function unless(arg: unless.Options | booleanReturn): Koa.Middleware;

export = unless;

declare namespace unless {
    interface Options {
        method?: string | string[];
        path?: string | string[] | RegExp | RegExp[];
        ext?: string| string[];
        custom?: booleanReturn;
        useOriginalUrl?: boolean;
    }

    interface Middleware extends Koa.Middleware {
        unless(params?: unless.Options): typeof unless;
    }
}
