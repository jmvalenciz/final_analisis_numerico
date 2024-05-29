import * as math from 'mathjs';

export default function* biseccion(f: string, start:number, end:number, tol:number){
	let a = start;
	let b = end;
	let m = (a+b)/2;
	let i = 0;
	const fn = math.compile(f);
	let f_a = fn.evaluate({x:a});
	let f_b = fn.evaluate({x:b});
	let err = Math.abs(b-a)/Math.pow(2, i);
	if(f_a*f_b>0){
		throw new Error("No hay raiz en el intervalo");
	}
	do {
		let f_m = fn.evaluate({x:m});
		if(f_a==0){
			yield {a,b:b,err:0,i}
			return;
		}
		if(f_b==0){
			yield {a:b,b,err:0,i};
			return;
		}
		if(f_m==0){
			yield {a:m,b:m,err:0,i};
			return;
		}
		if(f_a*f_m<0){
			b=m;
		} else {
			a=m;
		}
		m = (a+b)/2;
		f_a = fn.evaluate({x:a});
		f_b = fn.evaluate({x:b});
		i++;
		err = Math.abs(b-a)/Math.pow(2, i);
		yield {a,b,err,i};
	} while(err>tol);
}