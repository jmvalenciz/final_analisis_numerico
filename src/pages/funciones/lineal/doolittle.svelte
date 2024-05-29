<script lang="ts">
	import MatrixInput from "../../../components/MatrixInput.svelte";
	import VectorInput from "../../../components/VectorInput.svelte";
    import {doolittle} from "../../../controllers/funciones/ecuaciones-lineales/doolittle";
	import { sleep } from "../../../controllers/utils";
    var result:any = {};
	var ready = false;
	let A = [[0]];
	let b = [0];
	async function evalTaylor(e:any){
		ready = false;
		result = doolittle(A,b);
		console.log(result)
		ready = true;
	}
</script>
<div>
    <MatrixInput variable="A" bind:matrix={A}/>
    <VectorInput variable="b" bind:vector={b}/>
	<button type="submit" value="Eval" on:click={evalTaylor}>Eval</button>
</div>
<div>
<div class={ready?"ready":""}>
	{#if ready}
	<div>
		<h1>L</h1>
		{#each result.L as l}
				<tr>
					{#each l as item}
						<td>{item}</td>
					{/each}
				</tr>
		{/each}
	</div>
	<div>
		<h1>U</h1>
		<table>
			{#each result.U as u}
				<tr>
					{#each u as item}
						<td>{item}</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
	<div><h1>sol</h1>{result.sol}</div>
	{/if}
</div>
</div>

<style>
	.ready > tr:last-child{
		background-color: var(--text-accent);
	}
</style>
