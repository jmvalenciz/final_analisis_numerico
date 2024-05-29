<script lang="ts">
	import MatrixInput from "../components/MatrixInput.svelte";

	let counter = 0;

	import NotificationController from "../controllers/notifications";
	//document.getElementById("on-error")!.onclick = () => {
	//	NotificationController.send({
	//		title: "Error",
	//		body: `lorem ipsum ${counter++}`,
	//		type: "error",
	//	});
	//};
	let A = [[1]]
    function print(){
        console.table(A)
    }
</script>
<div id="toast-list"></div>
<div class="container">
    <MatrixInput variable="A" bind:matrix={A}/>
    <MatrixInput variable="B"/>
    <button id="on-error" on:click={print}>Add</button>
</div>