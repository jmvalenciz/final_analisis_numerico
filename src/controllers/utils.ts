export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class NoImplementedException extends Error {
    constructor(){
        super("No Implemented Exception");
        Object.setPrototypeOf(this, NoImplementedException.prototype);
    }
}

export class NoValorIntermedioException extends Error {
    constructor(){
        super("No Valor Intermedio Exception");
        Object.setPrototypeOf(this, NoValorIntermedioException.prototype);
    }
}

export type Fn = (x:number)=>number;
export type Matrix = number[][];
export type Vector = number[];

export function validacion_EDD(A:Matrix){
    for(let [i,linea] of A.entries()){
        let index = 0;
        let max = linea[index];
        for(let j=1; j<A.length;j++){
            if(Math.abs(linea[j]) >= Math.abs(max)){
                index = j;
                max = linea[j];
            }
        }
        if(index != i){
            throw Error("La matriz no es estrictamente diagonalmente dominante");
        }
    }
}

export function zeroes(n:number){
    let m = [];
    for(let i=0;i<n;i++){
        let l = [];
        for(let j=0;j<n;j++){
            l.push(0)
        }
        m.push(l);
    }
    return m;
}