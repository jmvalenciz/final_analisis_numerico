<script lang="ts">
    export let variable;
    export let vector:number[] = [0];

    var current_editable:{i?:number, j?:number} = {
        i:undefined,
    }
    //var matrix:Array<Array<number>> = [
    //    [0,0,0],
    //    [0,0,0],
    //    [0,0,0]
    //];
    function add_horizontal(){
        vector = [...vector,0];
    }
    function remove_column(i:number){
        vector.splice(i, 1);
        vector = [...vector];
    }
    function handleInput(e:any, i:number){
        const parsed = Number.parseFloat(e.target.value);
        vector[i] = Number.isNaN(parsed)?0:parsed;
    }

</script>

<div class="container">
    <h1>{variable} =</h1>
    <div id="matrix">
        <table>
            <tr>
                <td> <b>{vector.length}</b> </td>
            </tr>
            {#each vector as item, i}
                <tr>
                    <td><button class="remove" on:click={()=>remove_column(i)}>-</button></td>
                    <td>
                        {#if current_editable.i == i}
                        <input class="item-edit" on:input={(e)=>handleInput(e,i)} type="text" name="" id="" value={item}>
                        {:else}
                            <div on:click={(e)=>current_editable={i}} class="item">{item}</div>
                        {/if}
                    </td>
                </tr>
            {/each}
        </table>
        <div></div>
        <button id="add-vertical" on:click={()=>add_horizontal()}>+</button>
        <button on:click={()=>current_editable={i:undefined,j:undefined}}>✓</button>
    </div>
</div>
<style>
    .container{
        display:flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
    }

    h1{
        display:block;
        white-space: nowrap;
    }
    table{
        width: auto;
        border-collapse: collapse;
    }
    .item{
        cursor:pointer;
        padding: 1rem;
        border: 1px none var(--border-color);
    }
    .item:hover{
        background-color: var(--background-secondary);
        border-radius: 5px;
        border: 1px solid var(--border-color);
    }
    .item-edit{
        width: 1rem;
        border-radius: 5px;
    }
    tr:nth-child(n+2) td:nth-child(2){
        border-left: 1px solid var(--border-color);
    }
    tr:nth-child(n+2) td:last-child{
        border-right: 1px solid var(--border-color);
    }

    #matrix{
        border: 1px solid var(--border-color);
        margin: 1rem;
        border-radius: 1rem;
        background-color: var(--background-primary);
        padding: 1rem;
        display:grid;
        gap: 1rem;
        justify-content: center;
        align-content: center;
        grid-template-columns: 1fr 2rem;
        grid-template-rows: 1fr 2rem;
        width: min-content;
    }

    button{
        background-color: var(--background-primary);
        border: 1px solid var(--border-color);
        border-radius: 2rem;
        color: white;
        font-weight: bold;
        font-size: medium;
        transition: background-color 0.3s ease;
    }
    button:hover{
        background-color: var(--background-secondary);
    }
    button.remove{
        padding: 8px 14px;
        margin: 0.5rem;
    }
</style>