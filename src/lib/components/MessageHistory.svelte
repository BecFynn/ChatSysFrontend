<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from "svelte";
	import { writable, get } from "svelte/store";
	import Header from "./Header.svelte";
	import { getSocket } from "$lib/util/socket";
	import { page } from "$app/state";
	import MessageBubble from "./MessageBubble.svelte";
	import { Api, type GetMessagesReponse, type MessageDTO, type MessageResponse } from "$lib/api/Api";

	export let chatData: GetMessagesReponse;

	const messages = writable<MessageDTO[]>([...chatData.messages]);

	let socket: WebSocket | null = null;
	let container: HTMLDivElement;
	let isAtBottom = true;

	// Scroll to bottom helper
	function scrollToBottom() {
		container.scrollTop = container.scrollHeight;
	}

	// Check if user is at bottom
	function checkIsAtBottom() {
		const threshold = 30; // how close to bottom before considered "at bottom"
		const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		isAtBottom = distanceFromBottom < threshold;
	}

	onMount(() => {
		scrollToBottom(); // scroll on first mount

		socket = getSocket();
		if (!socket) return;

		console.log("Websocket connected", socket);

		socket.addEventListener("message", (event) => {
			const newMessage = JSON.parse(event.data) as MessageResponse;
			if (newMessage.action === "message" && newMessage.message) {
				const myNewMessage: MessageDTO = newMessage.message;
				messages.update(msgs => [...msgs, myNewMessage]);
		}
		});

		const cleanup = () => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.close();
				console.log("Websocket disconnected");
			}
		};

		window.addEventListener("beforeunload", cleanup);
		onDestroy(() => {
			cleanup();
			window.removeEventListener("beforeunload", cleanup);
		});
	});

	// Watch for new messages
	afterUpdate(() => {
		if (isAtBottom) {
			scrollToBottom();
		}
	});
</script>



<Header target={chatData.target} />

<p>Messages:</p>
<div
	bind:this={container}
	class="flex flex-col overflow-y-auto h-full px-2"
	on:scroll={checkIsAtBottom}
>
	{#each $messages as message}
		<MessageBubble {message}/>
	{/each}
</div>
