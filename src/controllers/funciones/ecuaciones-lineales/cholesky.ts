import type { Matrix, Vector } from "../../utils"

export default function cholesky(A: Matrix, b: Vector){
    const n = A.length;
    let L = Array(n).fill(Array(n).fill(0));
    let sum;
    for(let i=0;i<n;i++){
        sum = 0;
        for(let k=0;k<i;k++){
            sum += Math.pow(L[i][k], 2);
        }
        L[i][i] = Math.sqrt(A[i][i]-sum);
        for(let j=i+1;j<n;j++){
            sum=0;
            for(let k=0;k<i;k++){
                sum+=L[k][i]*L[k][j];
            }
            L[j][i] = (A[j][i]-sum)/L[i][i];
        }

    }
}