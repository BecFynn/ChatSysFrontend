<script lang="ts">
	import { writable } from 'svelte/store';
    import { Api } from '$lib/api/Api';
    const api = new Api({
    baseURL:"http://localhost:5191"
})
	export let onSend: (message: string) => void;

	const input = writable('');
	
	async function handleSend() {
	const message = $input.trim();
	if (!message) return;

	const chats  =  await api.sendMessage({
        "senderID": "09f6770d-ae80-4779-bae7-34e58ef3cf4c",
        "receiverID": "391dde42-e9dd-4f98-b07d-4265c6516eeb",
        "content": message
      }).then(r => r.data)
      console.log(chats)


}

</script>

<div class="chatbox">
	<input
		type="text"
		bind:value={$input}
		placeholder="Type a message..."
		on:keydown={(e) => e.key === 'Enter' && handleSend()}
	/>
	<button on:click={handleSend}>Send</button>
</div>

<style>
	.chatbox {
		display: flex;
		gap: 0.5rem;
	}
	input {
		flex: 1;
		padding: 0.5rem;
	}
	button {
		padding: 0.5rem 1rem;
	}
</style>
