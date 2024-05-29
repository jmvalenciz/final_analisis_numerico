import type { Vector, Matrix } from "../../utils";
import * as math from 'mathjs';

export function gaussiana_pivoteo(A:Matrix, b:Vector){
    let aug = sys2augmented(A,b);
    for(let i=0; i<A.length-1; i++){
        for(let j=i+1;j<A.length;j++){
            const max_pivote = calc_max_pivote(A, i);
            if(max_pivote != i){
                A = swap_rows(A, i, max_pivote);
            }
            aug[j] = add_rows(aug[j], -aug[j][i]/aug[i][i], aug[i]);
        }
    }
    const {U, b2} = split_augmented(aug);
    const sol = math.usolve(U, b2);
    return { sol: sol as Vector, U };
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

function swap_rows(A:Matrix, i:number, j:number){
    const a = A[i];
    const b = A[j];
    A[i] = b;
    A[j] = a;
    return A;
}

function calc_max_pivote(A:Matrix, i:number){
    let max = Math.abs(A[i][i]);
    let index = i;
    for(let j=i+1;j<A.length;j++){
        const candidato = Math.abs(A[j][i]);
        if(candidato > max){
            max = candidato;
            index = j;
        }
    }
    return index;
}