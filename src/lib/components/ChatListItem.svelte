<script lang="ts">
	import type { UserDTO } from "$lib/api/Api";
    import Avatar from "./Avatar.svelte";
    import { userStore } from "$lib/stores/userStore";
    interface Props {
		person: UserDTO
	}
    
    let {person} : Props = $props()
</script>


<a href={`/chat/${person.id}`} class="bg-white h-[6rem] mb-3 rounded-lg flex flex-col py-1 px-3 cursor-pointer select-none">
    <div class="flex flex-row justify-between font-semibold">
        <p>Direct Chat</p>
        <div class="bg-green-400 hidden h-6 w-6 rounded-full text-center flex justify-center items-center">
            <p class="text-sm font-bold text-white">5</p>
        </div>
    </div>
    <div class="flex flex-row px-2 ">
    
        <div class="bg-white h-16 w-16 justify-self-start">
            <img src={person?.avatar} alt={person?.id} class="h-16 w-16 hidden">
            <Avatar person={person} myClass={"h-16 w-16 rounded-full"}/>
        </div>
        <div class="flex justify-center items-center bg-redx-500 w-full select-none">
            <p class="text-lg">{person.displayName}</p>
        </div>
    </div>
    
</a>
    
