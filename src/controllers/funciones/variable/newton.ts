import * as math from 'mathjs';

export function* newton(f: string, x0: number, tol: number, max_iter: number){
    const fn = math.compile(f);
    const d_fn = math.derivative(f, 'x');
    let xn = x0;
    let err;
    let i = 0;
    do{
        const xnext = xn - fn.evaluate({x:xn})/d_fn.evaluate({x:xn});
        err = Math.abs(xnext - xn);
        xn = xnext;
        yield {xn, err, i};
        i++;
    } while(err > tol && i<=max_iter);
}