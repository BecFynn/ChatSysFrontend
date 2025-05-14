<script lang="ts">
	import { writable } from 'svelte/store';
    import { Api } from '$lib/api/Api';
    const api = new Api({
    baseURL:"http://localhost:5191"
})

	const input = writable('');
	async function handleSend() {
	const message = $input.trim();
	if (!message) return;

	const chats  =  await api.sendCreate({
        "senderID": "80ab04f5-51ea-4408-a698-5dcf73116478",	
        "receiverID": "80ab04f5-51ea-4408-a698-5dcf73116478",	
        "content": message
      }).then(r => r.data)
      console.log(chats)


}

</script>

<div class="bg-redx-500 mt-auto w-full flex justify-between">
	<input
		class="h-full w-full border-2 border-gray-300 p-5"
		type="text"
		bind:value={$input}
		placeholder="Type a message..."
		on:keydown={(e) => e.key === 'Enter' && handleSend()}
	/>
	<button class="bg-gray-200 cursor-pointer hover:bg-gray-300 p-10" on:click={handleSend}>Send</button>
</div>


