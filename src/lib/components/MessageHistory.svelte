<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { writable, get } from "svelte/store";
	import Header from "./Header.svelte";
	import { getSocket } from "$lib/util/socket";
	import { page } from "$app/state";
	import MessageBubble from "./MessageBubble.svelte";
	import { Api, type GetMessagesReponse, type MessageDTO, type MessageResponse } from "$lib/api/Api";

	interface Props {
		chatData: GetMessagesReponse
	}
    let {chatData}: Props = $props();
	let messages = writable<MessageDTO[]>([]);
	$effect(() => {
	if (chatData?.messages) {
		messages.set(chatData.messages);
	}
	});

	let socket: WebSocket | null = null;
	let container: HTMLDivElement;
	let isAtBottom = true;

	function scrollToBottom() {
		container.scrollTop = container.scrollHeight;
	}

	function checkIsAtBottom() {
		const threshold = 30;
		const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		isAtBottom = distanceFromBottom < threshold;
	}

	onMount(() => {
		scrollToBottom();

		socket = getSocket();
		if (!socket) return;

		console.log("Websocket connected", socket);

		socket.addEventListener("message", (event) => {
			const newMessage = JSON.parse(event.data) as MessageResponse;
			if (newMessage.action === "message" && newMessage.message) {
				const myNewMessage: MessageDTO = newMessage.message;
				const targetId = chatData.target.id;
			
				if (
					myNewMessage.groupReciever?.id === targetId ||
					myNewMessage.userReciever?.id === targetId
				) {
					console.log(newMessage)
					messages.update(msgs => [...msgs, myNewMessage]);
				}
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

	$effect(() => {
		scrollToBottom();
	})
</script>

<Header target={chatData.target} />
<br>
<div
	bind:this={container}
	class="flex flex-col overflow-y-auto h-full px-2"
	on:scroll={checkIsAtBottom}
>
	{#each $messages as message}
		<MessageBubble {message}/>
	{/each}
</div>
