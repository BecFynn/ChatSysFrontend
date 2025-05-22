<script lang="ts">
	import type { GroupchatDTO, UserDTO } from "$lib/api/Api";
    import Avatar from "./Avatar.svelte";

    interface Props {
		groupchat: GroupchatDTO
	}
    let { groupchat} : Props = $props()
</script>

<a href={`/chat/${groupchat.id}`} class="bg-white h-[6rem] mb-3 rounded-lg flex flex-col py-1 px-3 cursor-pointer select-none">
    <div class="flex flex-row justify-between font-semibold">
        <p>Group Chat</p>
        <div class="bg-green-400 hidden h-6 w-6 rounded-full text-center flex justify-center items-center">
            <p class="text-sm font-bold text-white">5</p>
        </div>
    </div>
    <div class="flex flex-row px-2 justify-">
        <div class="bg-white h-16 w-16 justify-self-start flex flex-row">
            {#each groupchat.users || [] as user}
                <img src={user?.avatar} alt={user?.id} class="h-16 w-16 -ml-5 hidden">
                <Avatar person={user} myClass={"h-16 w-16 -ml-5"}/>
            {/each}
        
        </div>
        <div class="flex justify-center items-center bg-redx-500 w-full">
            <p class="text-lg">{groupchat.name}</p>
        </div>
    </div>
</a>