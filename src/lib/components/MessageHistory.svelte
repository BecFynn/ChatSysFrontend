<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { writable, get } from 'svelte/store';
	import Header from './Header.svelte';
	import { getSocket } from '$lib/util/socket';
	import { page } from '$app/state';
	import Bubble from './Bubble.svelte';
	import {
		Api,
		type GetMessagesReponse,
		type MessageDTO,
		type MessageResponse
	} from '$lib/api/Api';
	import { userStore } from '$lib/stores/userStore';
	const currentUserId = $userStore?.id;

	interface Props {
		chatData: GetMessagesReponse;
	}
	let { chatData }: Props = $props();
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
		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight;
		isAtBottom = distanceFromBottom < threshold;
	}

	onMount(() => {
		scrollToBottom();

		socket = getSocket();
		if (!socket) return;

		console.log('Websocket connected', socket);

		socket.addEventListener('message', async (event) => {
			const newMessage = JSON.parse(event.data) as MessageResponse;
			if (newMessage.action === 'message' && newMessage.message) {
				const myNewMessage: MessageDTO = newMessage.message;
				const targetId = chatData.target.id;
				const isUserToUserChat = !!myNewMessage.userReciever;
				const isGroupChat = !!myNewMessage.groupReciever;

				const isParticipant =
					// For user-to-user chats
					(isUserToUserChat &&
						(myNewMessage.sender?.id === currentUserId ||
							myNewMessage.userReciever?.id === currentUserId) &&
						chatData.target.id ===
							(myNewMessage.userReciever?.id === currentUserId
								? myNewMessage.sender?.id
								: myNewMessage.userReciever?.id)) ||
					// For group chats
					(isGroupChat && myNewMessage.groupReciever?.id === chatData.target.id);

				if (isParticipant) {
					messages.update((msgs) => [...msgs, myNewMessage]);
					await tick(); // Wait for DOM update
					scrollToBottom();
				}
			}
		});

		const cleanup = () => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.close();
				console.log('Websocket disconnected');
			}
		};

		window.addEventListener('beforeunload', cleanup);
		onDestroy(() => {
			cleanup();
			window.removeEventListener('beforeunload', cleanup);
		});
	});

	$effect(() => {
		scrollToBottom();
	});
</script>

<Header target={chatData.target} />
<br />
<div
	bind:this={container}
	class="flex h-full flex-col overflow-x-hidden overflow-y-auto px-2"
	onscroll={checkIsAtBottom}
>
	{#each $messages as message}
		<Bubble {message} />
	{/each}
</div>
