<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSocket } from "../../lib/util/socket";
	import { writable, derived } from 'svelte/store';
	import ChatInput from '$lib/components/ChatInput.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { MessageResponse, UserDTO } from '$lib/api/Api';
	import { json } from '@sveltejs/kit';
	import MessageHistory from '$lib/components/MessageHistory.svelte';
	import Header from '$lib/components/Header.svelte';
	import { ApiProvider } from '$lib/provider/ApiProvider';
	import { userStore } from '$lib/stores/userStore';
	
	let { children } = $props()

	
	//$effect(() => {
	//	if($userStore && window.location.pathname == "/chat"){
	//		window.location.pathname = `/chat/${$userStore.id}`
	//	}
	//})

</script>


{#if $userStore}
	<div class="bg-redx-500 w-full h-[100vh] flex flex-row">
	<Sidebar/>
	<div class="flex flex-col w-full">
		{@render children()}
		<ChatInput/>
	</div>

</div>
{/if}