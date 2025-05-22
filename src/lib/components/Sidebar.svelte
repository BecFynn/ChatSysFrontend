<script lang="ts">
	import "../../app.css"
	import { Api, type GroupchatDTO, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
	import { draw } from "svelte/transition";
	import AddGroupchat from "./AddGroupchat.svelte";
	import ChatListItem from "./ChatListItem.svelte";
	import GroupchatListItem from "./GroupchatListItem.svelte";
	import { userStore } from "$lib/stores/userStore";
	import { ApiProvider } from "$lib/provider/ApiProvider";
    const api = new ApiProvider().api;

	let users: UserDTO[] = [];
	let groups: GroupchatDTO[] = [];

	// Load users on component mount
	onMount(async () => {

		const userList = await api.userList().then(r => r.data);
		users = userList;
		

		const groupList = await api.myGroups.groupMyGroupsList().then(r => r.data);
		groups = groupList;
		
		console.log(groups)
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
	{#each groups as groupchat }

			<GroupchatListItem groupchat={groupchat} />
		{/each}
	</div>
	<AddGroupchat/>
	
</div>