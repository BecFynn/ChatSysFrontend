<script lang="ts">
	import { Api, type GetMessagesReponse, type MessageResponse } from "$lib/api/Api";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	
	import Header from "./Header.svelte";
	import { page } from "$app/state";
	import MessageBubble from "./MessageBubble.svelte";
	export let chatData : GetMessagesReponse;
	

	const messages = writable<MessageResponse[]>([]);
	//const api = new Api({baseURL:"http://localhost:5191"})
</script>

<Header target={chatData.target} />


<p>Messages:</p>
<div class="flex flex-col overflow-y-auto">
	{#each chatData.messages as message}
		<MessageBubble {message}/>
	{/each}
</div>
<div class="flex flex-col">
</div>