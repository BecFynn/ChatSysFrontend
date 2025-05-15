<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSocket } from "../../lib/util/socket";
	import { writable, derived } from 'svelte/store';
	import ChatInput from '$lib/components/ChatInput.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { MessageResponse } from '$lib/api/Api';
	import { json } from '@sveltejs/kit';
	import MessageHistory from '$lib/components/MessageHistory.svelte';
	import Header from '$lib/components/Header.svelte';
	// Store to hold incoming messages
	const messages = writable<MessageResponse[]>([]);
	let { children} = $props()
	let socket: WebSocket | null = null;

	onMount(() => {
		socket = getSocket() // getSocket should return an instance of WebSocket

		if(!socket){
			return
		}
		console.log(`Websocket connected`, socket)
		
		// Listen for incoming messages
		socket.addEventListener('message', (event) => {
			let data = event.data

			//console.log("message erhalten: ", event.data)
			const newMessage = JSON.parse(event.data) as MessageResponse;
			
			if(newMessage.action == "message"){
			
				console.log(newMessage)
				messages.update(msgs => [...msgs, newMessage]);
				console.log(newMessage.content)
			}
		


		});

		// Clean up on page unload
		const cleanup = () => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.close();
				console.log("Websocket disconnected")
			}
		};

		window.addEventListener('beforeunload', cleanup);

		onDestroy(() => {
			cleanup();
			window.removeEventListener('beforeunload', cleanup);
		});
	});
</script>


<div class="bg-redx-500 w-full h-[100vh] flex flex-row">
	<Sidebar/>
	<div class="flex flex-col w-full">
		{@render children()}
		<ChatInput/>
	</div>

</div>