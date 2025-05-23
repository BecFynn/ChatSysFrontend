<script lang="ts">
    import { Api, type GroupchatDTO, type Target, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
    import ChatListItem from "./ChatListItem.svelte";
	import { userStore } from '$lib/stores/userStore';
    export let target : Target | null;
	import Avatar from './Avatar.svelte';
    const api = new Api({baseURL:"http://localhost:5191"})

    async function addUser(personToAdd:UserDTO){
		//alert("adduser")

		const chats = await api.sendCreate({
		senderID: $userStore?.id,
		receiverID: target?.id,
		content: "/green "+ $userStore?.displayName +" Added " + personToAdd.displayName
		}).then(r => r.data);
		//console.log(chats);
	
        const adding = await api.addUser.groupAddUserCreate({
			groupId: target?.id,
			userid: personToAdd.id
		}).then(r => r.data);
		//console.log(adding);
    }
	
	async function removeUser(personToRemove:UserDTO){
		//alert("adduser")

		const chats = await api.sendCreate({
		senderID: $userStore?.id,
		receiverID: target?.id,
		content: "/red "+ $userStore?.displayName +" Removed " + personToRemove.displayName
		}).then(r => r.data);
		//console.log(chats);
	
        const adding = await api.removeUser.groupRemoveUserDelete({
			groupId: target?.id,
			userid: personToRemove.id
		}).then(r => r.data);
		//console.log(adding);


    }
	
    let users: UserDTO[] = [];
	let usersInGroup: GroupchatDTO;
    onMount(async () => {
		const userList = await api.userList().then(r => r.data)
		users = userList
		
		const group = await api.id.groupDetail(String(target?.id)).then(r => r.data)
		usersInGroup =group
		console.log(group)
	});
</script>

<div
	class="group w-90 bg-gray-300 rounded-b-none hover:bg-gray-500 cursor-pointer p-4 flex justify-center items-center rounded-md text-white font-bold ml-3 relative"
>
	<div>Manage User</div>
	<!--hidden-->
	<div class=" hidden absolute bg-gray-500 w-90 overflow-x-hidden no-scrollbar overflow-y-auto h-55  group-hover:block top-full left-0 z-10 rounded-b-md">
		{#if usersInGroup?.users}
		{#each usersInGroup?.users as person}
			<div class="flex flex-row justify-between gap-2 p-2 font-normal text-sm text-white">
				<div class="flex flex-row ">
					<img src={person.avatar} alt={person?.id} class="h-8 w-8 rounded-full hidden" />
					<Avatar person={person} myClass={"h-8 w-8 rounded-full"}/>
					{person.displayName}
				</div>
				<div>
					<a class="p-3 rounded-lg hover:bg-red-300" href="#" onclick={(e) => {
						e.preventDefault()
						removeUser(person)
					}}>-</a>
				</div>
			</div>
		{/each}
		{/if}
		{#each users as person}
			<div class="flex flex-row justify-between gap-2 p-2 font-normal text-sm text-white">
				<div class="flex flex-row ">
					<img src={person.avatar} alt={person?.id} class="h-8 w-8 rounded-full hidden" />
					<Avatar person={person} myClass={"h-8 w-8 rounded-full"}/>
					{person.displayName}
				</div>
				<div>
					<a class="p-3 rounded-lg hover:bg-green-300" href="#" onclick={(e) => {
						e.preventDefault()
						addUser(person)
					}}>+</a>
				</div>
			</div>
		{/each}
	</div>
</div>

