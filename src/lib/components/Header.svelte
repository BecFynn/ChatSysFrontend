<script lang="ts">
	import { onMount } from "svelte";
    import {type Target} from '$lib/api/Api';
	import { page } from "$app/state";
	import LogoutButton from "./LogoutButton.svelte";
	import AddToGroup from "./AddToGroup.svelte";
    import { userStore } from "$lib/stores/userStore";
	import Avatar from "./Avatar.svelte";
    interface Props {
        target: Target | null;
    }
    const { target }: Props = $props()

    const currentUser = $userStore
    
</script>


<div class="bg-gray-300 shadow-md h-18 p-4 flex justify-between">
    <div class="text-3xl font-bold flex flex-row">
        {target?.name}
        {#if target?.type=="group"}
            <AddToGroup target={target}/>
        {/if}
    </div>
    <div class="w3/5 flex flex-row">
        <Avatar person={currentUser!} myClass={"h-10 w-10"}/>
        <div class="m-1 w-4/5 h-5/5 text-3xl font-bold">{currentUser?.displayName}</div>
        <LogoutButton/>
    </div>
</div>