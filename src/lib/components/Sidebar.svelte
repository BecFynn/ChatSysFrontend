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
		let currentUser = $userStore; 
		const userList = await api.userList().then(r => r.data)
		const prioritizedUser = userList.find(user => user.id === currentUser?.id);
		const otherUsers = userList.filter(user => user.id !== currentUser?.id);
		users = [prioritizedUser!, ...otherUsers]

		
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
	<div class="bg-redx-500 h-[90%]">
		<div class="flex flex-row justify-around font-bold mb-5 text-xl  ">
		<p>Chats</p>

		</div>
		{#each users as person }
			<ChatListItem person={person}/>
		{/each}
		{#each GroupsofUser as groupchat }

			<GroupchatListItem groupchat={groupchat} />
		{/each}
	</div>
	<AddGroupchat/>
	
</div>