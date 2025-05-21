<script lang="ts">
	import { onMount } from "svelte";
    import {type Target} from '$lib/api/Api';
	import { page } from "$app/state";
	import LogoutButton from "./LogoutButton.svelte";
	import AddToGroup from "./AddToGroup.svelte";

    export let target : Target | null;
    
</script>


<div class="bg-gray-300 shadow-md h-18 p-4 flex justify-between">
    <div class="text-3xl font-bold flex flex-row">
        {target?.name}
        {#if target?.type=="group"}
            <AddToGroup target={target}/>
        {/if}
    </div>
    
    <LogoutButton/>
</div>