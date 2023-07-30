import { req, res } from "../../types";

export function wrapAsync(fn: (req: req, res: res, next?: any)=> Promise<void>) {
    return function(req: req, res: res, next: any) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }