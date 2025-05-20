<script lang="ts">
	import "../../app.css"
	import { Api, type GroupchatDTO, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
	import { draw } from "svelte/transition";
	import AddGroupchat from "./AddGroupchat.svelte";
	import ChatListItem from "./ChatListItem.svelte";
	import GroupchatListItem from "./GroupchatListItem.svelte";
    const api = new Api({baseURL:"http://localhost:5191"})

	let users: UserDTO[] = [];
	let groups: GroupchatDTO[] = [];
	// Load users on component mount
	onMount(async () => {
		const userList = await api.userList().then(r => r.data)
		users = userList
		const groupList = await api.groupList().then(r => r.data)
		groups = groupList
	});
</script>

<div class="h-screen overflow-y-auto min-w-[15rem] w-[30%] max-w-[19rem] bg-[#D9D9D9] flex flex-col p-5">
	<div class="flex justify-center items-center text-bold mb-5 text-xl">
		<p>Chats</p>
	</div>

	{#each users as person }
		<ChatListItem person={person}/>
	{/each}
	{#each groups as groupchat }
		<GroupchatListItem groupchat={groupchat} />
	{/each}
	<!--<AddGroupchat/>-->
	
</div>