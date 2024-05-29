import type { Fn } from "../../utils";
import * as math from 'mathjs';

export default function* biseccion(f: string, start:number, end:number, tol:number){
	let a = start;
	let b = end;
	let i = 0;
	const fn = math.compile(f);
	let f_a = fn.evaluate({x:a});
	let f_b = fn.evaluate({x:b});
	let m = nuevo_m(a,f_a,b,f_b);
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
		i++;
		m = nuevo_m(a,f_a,b,f_b);
		f_a = fn.evaluate({x:a});
		f_b = fn.evaluate({x:b});
		err = Math.abs(b-a)/Math.pow(2, i);
		yield {a,b,err,i};
	} while(err>tol);
}

function nuevo_m(x1:number, y1:number, x2:number, y2:number){
    const m = (y2-y1)/(x2-x1);
    const b = y1-m*x1;
    //    y = mx + b
    // => (y-b)/m = x (pero y debe ser cero) 
    // => -b/m = x
    return -b/m;
}