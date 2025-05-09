<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSocket } from "../../lib/util/socket";
	import { writable, derived } from 'svelte/store';
	import Chatbox from '$lib/components/Chatbox.svelte';

	export let data;

	const messages = writable<string[]>([]);
	let socket: WebSocket | null = null;

	onMount(() => {
		socket = getSocket();
		if (!socket) return;

		socket.addEventListener('message', (event) => {
			messages.update(msgs => [...msgs, event.data]);
		});

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

	// Derived store to hold parsed messages
	const parsedMessages = derived(messages, ($messages) =>
		$messages.map((msg) => {
			try {
				return JSON.parse(msg);
			} catch {
				return { content: 'Invalid JSON' };
			}
		})
	);
</script>
<Chatbox onSend={(message)=> socket?.send(JSON.stringify({content: message}))}>   </Chatbox>

<div class="app-layout">
	<h1>CHATAPP</h1>
	<main>
		<slot />
		<h1>Messages: </h1>
		<ul>
			{#each $parsedMessages as message}
				<li>{message.content}</li>
			{/each}
		</ul>
	</main>
</div>
