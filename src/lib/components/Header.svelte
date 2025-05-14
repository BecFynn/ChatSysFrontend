<script lang="ts">
	import { onMount } from "svelte";
    import { Api, type GroupchatDTO, type Target, type UserDTO } from '$lib/api/Api';
	import { page } from "$app/state";

    export let target : Target | null;
</script>


<div class="bg-white shadow-md h-18">
    <p class="text-3xl font-bold">{target?.name}</p>
</div>