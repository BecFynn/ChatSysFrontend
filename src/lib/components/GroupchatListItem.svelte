<script lang="ts">
	import type { GroupchatDTO, UserDTO } from "$lib/api/Api";

    export let groupchat : GroupchatDTO
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
                <img src="https://api.dicebear.com/9.x/open-peeps/svg?seed={user.displayName}" class="h-16 w-16 -ml-5" alt="user img">    
            {/each}
        
        </div>
        <div class="flex justify-center items-center bg-redx-500 w-full">
            <p class="text-lg">{groupchat.name}</p>
        </div>
    </div>
</a>