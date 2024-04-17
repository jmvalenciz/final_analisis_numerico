import { derivative, parse, factorial } from "mathjs";

export default function* taylor(
	f: string,
	x0: number,
	xn: number,
	err: number
) {
	let x_next = xn;
	let disp = 0;
	let f_n = f;
	let n = 0;
	do {
		const f_next =
			(Math.pow(xn - x0, n) * parse(f_n).evaluate({ x: x0 })) / factorial(n);
		x_next += f_next;
		f_n = derivative(f_n, "x").toString();
		disp = f_next;
		yield {
			n,
			x_next,
			disp,
		};
		n++;
	} while (disp > err);
}
