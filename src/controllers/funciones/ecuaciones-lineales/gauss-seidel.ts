import { validacion_EDD, type Matrix, type Vector } from "../../utils";

export function* gauss_seidel(A:Matrix, b: Vector, valores_iniciales: Vector, tol: number, max_iter:number){
    validacion_EDD(A);    

    let formulas = [];
    const n = A.length;
    for(let i=0;i<n;i++){
        formulas.push(vec2formula(A[i], b[i], i));
    }
    let valores = [...valores_iniciales]; //deep clone para clonar los valores y no la referencia
    let err = 0;
    let iter = 0;
    do{
        for(let i =0; i<n;i++){
            valores[i] = formulas[i](valores);
        }
        err = Math.max(...vec2individual_err(valores, valores));
        yield { valores, err, iter };
        iter++;
    }while(err>tol && iter<max_iter);
}

function vec2formula(coeficientes:Vector, b: number, i: number): (x_n:Vector)=>number{
    const n = coeficientes.length;
    return (x_list: Vector)=>{
        let sum = -b;
        for(let j=0;j<n;j++){
            if(j==i){
                continue;
            }
            sum += coeficientes[j]*x_list[j]
        }
        return sum/coeficientes[i];
    };
}

function vec2individual_err(valores:Vector, previos:Vector):Vector{
    return valores.map((v, i)=>Math.abs(v-previos[i]));
}