<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSocket } from "../../lib/util/socket";
	import { writable } from 'svelte/store';

	export let data;

	// Store to hold incoming messages
	const messages = writable<string[]>([]);

	let socket: WebSocket | null = null;

	onMount(() => {
		socket = getSocket() // getSocket should return an instance of WebSocket

		if(!socket){
			return
		}

		// Listen for incoming messages
		socket.addEventListener('message', (event) => {
			messages.update(msgs => [...msgs, event.data]);
		});

		// Clean up on page unload
		const cleanup = () => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.close();
			}
		};

		window.addEventListener('beforeunload', cleanup);

		onDestroy(() => {
			cleanup();
			window.removeEventListener('beforeunload', cleanup);
		});
	});
</script>

<div class="app-layout">
	<h1>CHATAPP</h1>
	<main>
		<slot />
		<h1>Messages: </h1>
		<ul>
			{#each $messages as message}
				<li>{message}</li>
			{/each}
		</ul>
	</main>
</div>
