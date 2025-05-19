<script lang="ts">
	import { onMount } from "svelte";
    import { Api, type GroupchatDTO, type Target, type UserDTO } from '$lib/api/Api';
	import { page } from "$app/state";

    export let target : Target | null;
</script>


<div class="bg-red-500 shadow-md h-18 p-4 flex justify-between">
    <p class="text-3xl font-bold">{target?.name}</p>
    <a href="http://localhost:5191/api/v1/Auth/signout?returnUrl=http://localhost:5173/login" class="bg-blue-500 hover:bg-blue-400 cursour-pointer p-4 flex justify-center items-center rounded-md text-white font-bold">
        <p>Logout</p>
    </a>
</div>