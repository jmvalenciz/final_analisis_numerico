<script lang="ts">
	import NotificationController, { type NotificationMessage } from '../controllers/notifications';

	let messages: NotificationMessage[] = [];

	NotificationController.subscibe((message)=>{
		messages = [message, ...messages];
		setTimeout(()=>closeToast(message), 5000);
	});
	function closeToast(message:NotificationMessage){
			messages = messages.filter(m=> m!==message);
	}
</script>

<div id="toast-list">
	{#each messages as message}
		<div class="toast"  on:click={()=>closeToast(message)}>
			<b>{message.title}</b>
			<br>
			<span>{message.body}</span>
		</div>
	{/each}
</div>


<style>
	#toast-list{
		position: absolute;
		bottom:2rem;
		right:2rem;
		z-index: 5;
	}
	.toast{
		padding: 8px;
		background-color: var(--background-secondary);
		border: 1px solid var(--text-accent);
		border-radius: 8px;
		margin: 8px 0;
		width: 20rem;
	}

</style>
