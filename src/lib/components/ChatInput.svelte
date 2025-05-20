<script lang="ts">
	import { writable } from 'svelte/store';
    import { Api, type UserDTO } from '$lib/api/Api';
	import { page } from "$app/state";
	import { userStore } from '$lib/stores/userStore';
    const api = new Api({
    	baseURL:"http://localhost:5191"
	})

	const input = writable('');
	async function handleSend() {
	const message = $input.trim();
	if (!message) return;

	const currentUser = $userStore;

	if (!currentUser) {
		console.error("User not logged in");
		return;
	}

	const chats = await api.sendCreate({
		senderID: currentUser.id,
		receiverID: page.params.chatID,
		content: message
	}).then(r => r.data);

	console.log(chats);
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


