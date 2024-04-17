export default function* biseccion(f: (x:number)=>number, start:number, end:number, tol:number){
	let a = start;
	let b = end;
	let m = (a+b)/2;
	let i = 0;
	let f_a = f(a);
	let f_b = f(b);
	let err = Math.abs(a+b);
	if(f_a*f_b>0){
		throw new Error("No hay raiz en el intervalo");
	}
	do {
		let f_m = f(m);
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
		if(f_a*f_b<0){
			b=m;
		} else {
			a=m;
		}
		yield {a,b,err,i};
		i++;
		f_a = f(a);
		f_m = f(m);
		err = Math.abs(a+b);
	} while(err>tol);
}