import * as math from 'mathjs';

export function* raices_multiples(f: string, x0: number, tol: number, max_iter: number){
    const fn = math.compile(f);
    const dfn = math.derivative(f, 'x');
    const d_fn = dfn.compile();
    const d2_fn = math.derivative(dfn, 'x').compile();

    let xn = x0;
    let err;
    let i = 0;

    do {
        const f_xn = fn.evaluate({x:xn});
        const d_f_xn = d_fn.evaluate({x:xn});
        const d2_f_xn = d2_fn.evaluate({x:xn});
        const xnext = xn - (f_xn*d_f_xn)/(Math.pow(d_f_xn, 2)-f_xn*d2_f_xn);
        err = Math.abs(xnext - xn);
        xn = xnext;
        yield {xn, err, i};
        i++;
    } while(err>tol && i<=max_iter);
}