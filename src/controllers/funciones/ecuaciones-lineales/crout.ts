import type { Matrix, Vector } from "../../utils";
import * as math from 'mathjs';

export function doolittle(A: Matrix, b:Vector){
    const n = A.length;
    let L = Array(n).fill(Array(n).fill(0));
    let U = Array(n).fill(Array(n).fill(0));
    for(let i = 0; i<n;i++){
        L[i][i] = 1;
    }
    for(let j=0;j<n;j++){
        for(let i=j;i<n;i++){
            let sum = 0;
            for(let k=0;k<j;k++){
                sum = sum + L[i][k] * U[k][j];
            }
            L[i][j] = A[i][j] - sum;
        }
        for (let i = j; i < n; i++) {
			let sum = 0;
			for(let k = 0; k < j; k++) {
				sum = sum + L[j][k] * U[k][i];
			}
			if (L[j][j] == 0) {
				throw Error("Can't divide by 0");
			}
			U[j][i] = (A[j][i] - sum) / L[j][j];
		}
    }
    const z = math.lsolve(L, b);
    const sol = math.usolve(U, z);
    return { L, U, sol: sol as Vector };
}