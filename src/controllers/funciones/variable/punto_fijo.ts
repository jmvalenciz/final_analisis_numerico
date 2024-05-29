import * as math from 'mathjs';

export default function *punto_fijo(f:string, x_0:number, tol:number, n_iter: number){
	let x=x_0;
	let err;
	let i = 0;
	const g = gen_gx(f);
	const d_g = math.derivative(g, 'x');
	do{
		const x_next = g.evaluate({x});
		err = Math.abs(x_next-x);
		i++;
		yield {i,x,err,g_x: x_next};
		x=x_next;
	} while(i<=n_iter && err > tol);
}

function gen_gx(f: string){
	return math.parse(f+'+x');
}