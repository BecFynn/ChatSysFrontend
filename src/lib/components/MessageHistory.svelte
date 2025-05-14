<script lang="ts">
	import { Api, type GetMessagesReponse, type MessageResponse } from "$lib/api/Api";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	
	import Header from "./Header.svelte";
	import { page } from "$app/state";
	export let chatData;
	

	const messages = writable<MessageResponse[]>([]);

	const api = new Api({
    baseURL:"http://localhost:5191"
	})
	/*
	$effect(() => {
		async function fetchChat() {
			let res = await api.messageList({target: page.params.chatID}).then(r => r.data)
			chatData = res;
		}
		console.log(page.params.chatID)

		if(page.params.chatID){
			fetchChat()
		}

		console.log(chatData)

	})*/

	//onMount(async () => {
	//	if(page.params.chatID){
	//		let res = await api.messageList({target: page.params.chatID}).then(r => r.data)
//
	//	chatData = res;
	//	}
	//})
</script>

<Header target={chatData.target} />


<p>Messages:</p>
<div class="flex flex-col">
	{#each $messages as message}
		<p class="text-bold">{message.content}</p>
	{/each}
</div>
<div class="flex flex-col">
</div>