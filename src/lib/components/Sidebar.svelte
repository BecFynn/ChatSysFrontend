<script lang="ts">
	import "../../app.css"
	import { Api, type GroupchatDTO, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
	import { draw } from "svelte/transition";
	import AddGroupchat from "./AddGroupchat.svelte";
	import ChatListItem from "./ChatListItem.svelte";
	import GroupchatListItem from "./GroupchatListItem.svelte";
	import { userStore } from "$lib/stores/userStore";
    const api = new Api({baseURL:"http://localhost:5191"})

	let users: UserDTO[] = [];
	let groups: GroupchatDTO[] = [];
	let GroupsofUser: GroupchatDTO[] = [];

	// Load users on component mount
	onMount(async () => {
		const userList = await api.userList().then(r => r.data)
		users = userList;
		
		let currentUser = $userStore; 
		const groupList = await api.groupList().then(r => r.data);
		groups = groupList;
		
		if (currentUser) {
			GroupsofUser = groups.filter(group =>
				group.users?.some(u => u.id == currentUser.id)
			);
		}
		console.log(GroupsofUser)
	});
</script>

<div class="h-screen overflow-y-auto min-w-[15rem] w-[30%] max-w-[19rem] bg-[#D9D9D9] flex flex-col p-5">
	<div class="flex justify-center items-center text-bold mb-5 text-xl">
		<p>Chats</p>
	</div>

	{#each users as person }
		<ChatListItem person={person}/>
	{/each}
	{#each GroupsofUser as groupchat }

		<GroupchatListItem groupchat={groupchat} />
	{/each}
	<AddGroupchat/>
	
</div>