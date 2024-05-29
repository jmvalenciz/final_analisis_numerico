<script lang="ts">
    import {newton} from "../../../controllers/funciones/variable/newton";
	import { sleep } from "../../../controllers/utils";
    var iterations:any[] = [];
	var ready = false;
	async function evalTaylor(e:any){
		const formData = new FormData(e.target);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		iterations = [];
		ready = false;
		data.err = Number.parseFloat(data.err);
		data.x0 = Number.parseFloat(data.x0);
		data.max_iter = Number.parseInt(data.max_iter);
		console.log(data)
		for(let i of newton(data.function, data.x0, data.err, data.max_iter)){
			iterations = [...iterations, i];
			await sleep(100);
		}
		ready = true;
	}
</script>
<form on:submit|preventDefault={evalTaylor}>
	<label >
		<span>f(x)</span>
		<br>
		<input type="text" name="function">
	</label>
	<label>
		<span>x0</span>
		<br>
		<input type="text" name="x0">
	</label>
	<label>
		<span>Err</span>
		<br>
		<input type="text" name="err">
	</label>
	<label>
		<span>Max Iter</span>
		<br>
		<input type="text" name="max_iter">
	</label>
	<br>
	<input type="submit" value="Eval">
</form>
<div>
<table class={ready?"ready":""}>
    <tr>
        <th>iter</th>
        <th>x<sub>i</sub></th>
        <th>err</th>
    </tr>
    {#each iterations as i}
        <tr>
            <td>{i.i}</td>
            <td>{i.xn.toExponential(3)}</td>
            <td>{i.err.toExponential(3)}</td>
        </tr>
    {/each}
</table>
</div>

<style>
	.ready > tr:last-child{
		background-color: var(--text-accent);
	}
</style>
