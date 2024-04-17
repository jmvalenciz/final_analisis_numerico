export default function *punto_fijo(x_0:number, g: (x:number)=>number, tol:number, n_iter: number){
	let x=x_0;
	let err;
	let i = 0;
	do{
		const x_next = g(x);
		err = Math.abs(x_next-x);
		yield {x,err,g_x: x_next};
		x=x_next;
		i++;
	} while(i<=n_iter && err > tol);
}