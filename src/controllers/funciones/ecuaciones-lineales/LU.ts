import type { Matrix, Vector } from "../../utils";
import * as math from 'mathjs';

export function LU(A:Matrix, b:Vector){
    let aug = sys2augmented(A,b);
    const n = A.length;
    let L = Array(n).fill(Array(n).fill(0));
    for(let i=0; i<A.length-1; i++){
        for(let j=i+1;j<A.length;j++){
            const m = aug[j][i]/aug[i][i];
            aug[j] = add_rows(aug[j], -m, aug[i]);
            if(i==j){
                L[j][i] = 1;
            } else{
                L[j][i] = m;
            }
        }
    }
    const {U, b2} = split_augmented(aug);
    const sol = math.usolve(U, b2);
    return {sol: sol as Vector, U, L};
}

function split_augmented(aug: Matrix){
    let U:Matrix = [];
    let b2:Vector = [];
    for(let a of aug){
        b2.push(a.pop()!);
        U.push(a);
    }
    return {U,b2}
}

function add_rows(row1: Vector, scalar: number, row2: Vector){
    for(let i=0;i<row1.length; i++){
        row1[i] += scalar*row2[i];
    }
    return row1;
}

function sys2augmented(A:Matrix, b:Vector){
    for(let [i,row] of A.entries()){
        row.push(b[i]);
    }
    return A;
}