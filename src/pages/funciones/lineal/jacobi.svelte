<script lang="ts">
	import MatrixInput from "../../../components/MatrixInput.svelte";
	import VectorInput from "../../../components/VectorInput.svelte";
    import {jacobi} from "../../../controllers/funciones/ecuaciones-lineales/jacobi";
	import { sleep } from "../../../controllers/utils";
    var iter:any[] = [];
	var ready = false;
	let err = 0;
	let max_iter = 0;
	let A = [[0]];
	let iniciales = [0];
	let b = [0];
	async function evalTaylor(e:any){
		ready = false;
		for(let i of jacobi(A,b,iniciales, err, max_iter)){
			iter = [...iter,i];
		}
		ready = true;
	}
</script>
<div>
    <MatrixInput variable="A" bind:matrix={A}/>
    <VectorInput variable="b" bind:vector={b}/>
    <VectorInput variable="iniciales" bind:vector={iniciales}/>
	<label >
		<span>Max Iter</span>
		<br>
		<input type="text" name="function" value={max_iter}>
	</label>
	<label >
		<span>Error</span>
		<br>
		<input type="text" name="function" value={err}>
	</label>
	<button type="submit" value="Eval" on:click={evalTaylor}>Eval</button>
</div>
<div>
<div class={ready?"ready":""}>
	{#each iter as result}
	<div>
		<h1>Valores</h1>
		<tr>
			{#each result.valores as item}
				<td>{item}</td>
			{/each}
		</tr>
	</div>
	<div>
		<h1>Error: {result.err}</h1>

	</div>
	<div><h1>sol</h1>{result.sol}</div>
	{/each}
</div>
</div>

<style>
	.ready > tr:last-child{
		background-color: var(--text-accent);
	}
</style>
