<script lang="ts">
    import taylor from "../../../controllers/funciones/variable/taylor";
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
			data.xn = Number.parseFloat(data.xn);
			console.log(data)
			for(let i of taylor(data.function, data.x0, data.xn, data.err)){
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
	<br>
	<label>
		<span>X0</span>
		<br>
		<input type="text" name="x0">
	</label>
	<br>
	<label>
		<span>Xn</span>
		<br>
		<input type="text" name="xn">
	</label>
	<br>
	<label>
		<span>Err</span>
		<br>
		<input type="text" name="err">
	</label>
	<br>
	<input type="submit" value="Eval">
</form>
<div>
<table class={ready?"ready":""}>
    <tr>
        <th>iter.</th>
        <th>f(x)</th>
        <th>disp.</th>
    </tr>
    {#each iterations as i}
        <tr>
            <td>{i.n}</td>
            <td>{i.x_next.toExponential(3)}</td>
            <td>{i.disp.toExponential(3)}</td>
        </tr>
    {/each}
</table>
</div>

<style>
	.ready > tr:last-child{
		background-color: var(--text-accent);
	}
</style>
