<script lang="ts">
	import { onMount } from "svelte";
    import { Api, type GroupchatDTO, type Target, type UserDTO } from '$lib/api/Api';
	import { page } from "$app/state";
	import LogoutButton from "./LogoutButton.svelte";
	import AddToGroup from "./AddToGroup.svelte";

    export let target : Target | null;
</script>


<div class="bg-gray-300 shadow-md h-18 p-4 flex justify-between">
    <div class="text-3xl font-bold flex flex-row">
        {target?.name}
              
        <AddToGroup target={target}/>
    </div>
    
    <LogoutButton/>
</div>