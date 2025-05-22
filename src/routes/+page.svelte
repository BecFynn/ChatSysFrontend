<script lang="ts">
	import "../app.css";
	import { userStore } from "$lib/stores/userStore";
	import LogoutButton from "$lib/components/LogoutButton.svelte";
</script>

<div class="h-[100vh] flex justify-center items-center">
	<div class="bg-gray-300 w-[50%] h-[60%] rounded-sm flex flex-col justify-center items-center p-4">
		<h2 class="text-xl font-semibold mb-4">User Info</h2>

		{#if $userStore}
			<pre class="text-sm bg-white p-4 rounded w-full max-h-[80%] overflow-auto">
				{JSON.stringify($userStore, null, 2)}
			</pre>

			<div class="w-full m-4 flex justify-center items-center flex-row gap-5">
				<a
					href="/chat"
				    class="bg-green-500 hover:bg-green-400 cursor-pointer p-4 flex justify-center items-center rounded-md text-white font-bold"
				>
				    <p>Chat</p>
			</a>
				<LogoutButton/>
			</div>
		{:else}
			<p>No user...</p>
		{/if}
		
	</div>
</div>
