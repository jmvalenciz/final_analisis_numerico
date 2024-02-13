<script lang="ts">
    import { derivative } from 'mathjs';
    var result = "";
    function form(e:any){
        e.preventDefault();
        const data = new FormData(e.target);
        result = derivative(data.get("input") as string, 'x').toString();
    }
</script>
<div>
    <form on:submit={form}>
        <input type="text" name="input" placeholder="alan.doe@example.com">
        <input type="submit" value="Text">
    </form>
    <h1 id="result">{result}</h1>
</div>