<script lang="ts">
	import { Api, type GetMessagesReponse } from "$lib/api/Api";
	import { onMount } from "svelte";
    export let messages
	
	import Header from "./Header.svelte";
	import { page } from "$app/state";

</script>

<Header  />

<p>Messages:</p>
<div class="flex flex-col">
	{#each $messages as message}
		<p class="text-bold">{message.content}</p>
	{/each}
</div>
<div class="flex flex-col">
</div>