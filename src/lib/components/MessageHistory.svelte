<script lang="ts">
    export let messages
</script>

<p>Messages:</p>
<div class="flex flex-col">
	{#each $messages as message}
		<p class="text-bold">{message.content}</p>
	{/each}
</div>
<div class="flex flex-col">
</div>