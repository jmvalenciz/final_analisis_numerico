import type { Fn } from "../../utils";
import * as math from 'mathjs';

export function* secante(f: string, x0: number, x1: number, tol: number, max_iter: number){
    const fn = math.compile(f);
    let xn = x0;
    let xn_1 = x1;
    let err;
    let i = 0;
    do{
        const xnext = xn - fn.evaluate({x:xn})*(xn - xn_1)/(fn.evaluate({x:xn})-fn.evaluate({x:xn_1}));
        err = Math.abs(xnext - xn);
        xn_1 = xn;
        xn = xnext;
        yield {xn, xn_1, err, i};
        i++;
    } while(err > tol && i<=max_iter);
}