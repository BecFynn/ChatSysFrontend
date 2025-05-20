<script lang="ts">
    import { Api, type GroupchatDTO, type Target, type UserDTO } from '$lib/api/Api';
	import { onMount } from 'svelte';
    import ChatListItem from "./ChatListItem.svelte";
    export let target : Target | null;

    const api = new Api({baseURL:"http://localhost:5191"})

    async function addUser(personToAdd:UserDTO){
        const chats = await api.addUser.groupAddUserCreate({
			groupId: target?.id,
			userid: personToAdd.id
		}).then(r => r.data);

		console.log(chats);
    }

    let users: UserDTO[] = [];
    onMount(async () => {
		const userList = await api.userList().then(r => r.data)
		users = userList
	});
</script>

<div
	class="group bg-gray-300 rounded-b-none hover:bg-gray-500 cursor-pointer p-4 flex justify-center items-center rounded-md text-white font-bold ml-3 relative"
>
	<div>Add User</div>

	<div class="absolute bg-gray-500 hidden group-hover:block top-full left-0 z-10 rounded-b-md">
		{#each users as person}
			<a
				on:click|preventDefault={() => addUser(person)}
				href="#"
				class="flex flex-row items-center gap-2 p-2 hover:bg-gray-300 font-normal text-sm text-white"
			>
				<img src={person.avatar} alt={person?.id} class="h-8 w-8 rounded-full" />
				{person.displayName}
			</a>
		{/each}
	</div>
</div>

