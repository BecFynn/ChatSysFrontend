<script lang="ts">
	import "../../app.css"
	import ChatListItem from "./ChatListItem.svelte";
	import { Api, type GroupchatDTO, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
	import GroupchatListItem from "./GroupchatListItem.svelte";
    const api = new Api({baseURL:"http://localhost:5191"})

	let users: UserDTO[] = [];
	let groups: GroupchatDTO[] = [];
	// Load users on component mount
	onMount(async () => {
		const response = await api.userList() as any; // TEMP: cast since return type is void
		users = response.data;
		console.log("hier ")
		console.log(users);

		const responseGroups = await api.groupList() as any; // TEMP: cast since return type is void
		groups = responseGroups.data;
		console.log("hier ")
		console.log(groups);
	});


</script>

<div class="min-w-[15rem] w-[30%] max-w-[19rem] bg-[#D9D9D9] flex flex-col p-5">
	<div class="flex justify-center items-center text-bold mb-5 text-xl">
		<p>Chats</p>
	</div>

	{#each users as person }
		<ChatListItem person={person}/>
	{/each}
	{#each groups as groupchat }
		<GroupchatListItem groupchat={groupchat} />
	{/each}
	
</div>