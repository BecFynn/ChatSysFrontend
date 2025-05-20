<script lang="ts">
    import { userStore } from '$lib/stores/userStore';
    import { Api} from '$lib/api/Api';
	import { onMount } from 'svelte';
    const api = new Api({baseURL:"http://localhost:5191"})

	let groupName = "";

    async function addGroup(GroupName:String){
        const chats = await api.groupCreate({
			groupname: GroupName,
			creatorId: $userStore?.id
		}).then(r => r.data);

		console.log(chats);
    }

   
</script>

<div href="" class="bg-white h-[6rem] mb-3 rounded-lg flex flex-col py-1 px-3 cursor-pointer select-none">
    <div class="flex flex-row justify-between font-semibold">
        <p>Group Chat Erstellen</p>
        
    </div>
    <div class="flex flex-row justify-center">
        <input 
            bind:value={groupName}
            type="text"
            placeholder="Gruppenname"
            class="border-2 rounded-lg"/>
        <a 
            href=""             
            onclick={() => addGroup(groupName)}
            class="ml-3 font-bold"> + </a>
    </div>
</div>

