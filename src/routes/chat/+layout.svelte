<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSocket } from "../../lib/util/socket";
	import { writable, derived } from 'svelte/store';

	// Store to hold incoming messages
	const messages = writable<string[]>([]);

	let socket: WebSocket | null = null;

	onMount(() => {
		socket = getSocket() // getSocket should return an instance of WebSocket

		if(!socket){
			return
		}
		console.log(`Websocket connected`, socket)
		
		// Listen for incoming messages
		socket.addEventListener('message', (event) => {

			messages.update(msgs => [...msgs, event.data]);
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
<Chatbox onSend={(message)=> socket?.send(JSON.stringify({content: message}))}>   </Chatbox>

<div class="bg-red-500 w-full h-[100vh] flex flex-row">
	<Sidebar/>
	{@render children()}

</div>