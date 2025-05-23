<script lang="ts">
	import "../app.css";
	import { userStore } from "$lib/stores/userStore";
	import LogoutButton from "$lib/components/LogoutButton.svelte";
	import { ApiProvider } from "$lib/provider/ApiProvider";
	import { onMount } from "svelte";
	import type { GroupchatDTO } from "$lib/api/Api";
	import { writable, type Writable} from "svelte/store";

	const api = new ApiProvider().api
    let userGroupchats = $state<GroupchatDTO[]>([]);

	// Fetch groups on mount
	onMount(() => {
	  async function fetchUserGroups() {
	    const response = await api.myGroups.groupMyGroupsList();
	    userGroupchats = response.data
	  }

  fetchUserGroups();
});
	// Helper for fallback avatar
	function getInitials(name: string | null, surname: string | null) {
		if (!name && !surname) return "U";
		return `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase();
	}
</script>

<div class="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-green-100 flex flex-col items-center justify-center">
	<!-- Header -->
	<header class="w-full flex justify-between items-center px-8 py-6 bg-white shadow-md">
		<a href="/" class="text-2xl font-bold text-blue-700 tracking-wide">ChatApp</a>
		{#if $userStore}
			<div class="flex items-center gap-4">
				<span class="text-gray-700 font-medium">Hi, {$userStore.displayName || $userStore.name || "User"}!</span>
				<LogoutButton/>
			</div>
		{/if}
	</header>

	<!-- Main Content -->
	<main class="flex-1 w-full flex flex-col items-center justify-center">
		{#if $userStore}
			<div class="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-xl w-full mt-12">
				<!-- Avatar -->
				<div class="mb-6">
					{#if $userStore.avatar}
						<img src="{$userStore.avatar}" alt="User Avatar"
							class="w-28 h-28 rounded-full border-4 border-blue-400 object-cover shadow" />
					{:else}
						<div class="w-28 h-28 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 border-4 border-blue-400 shadow">
							{getInitials($userStore.name!, $userStore.surname!)}
						</div>
					{/if}
				</div>
				<!-- User Info -->
				<h2 class="text-2xl font-bold text-blue-700 mb-2">
					{$userStore.displayName || `${$userStore.name || ""} ${$userStore.surname || ""}`.trim() || "User"}
				</h2>
				<p class="text-gray-500 mb-4 text-center">
					{$userStore.email || "No email provided"}
				</p>
				<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-sm text-gray-400">NT User</p>
                        <p class="font-medium text-gray-700">{$userStore.ntUser || "N/A"}</p>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-sm text-gray-400">Member Since</p>
                        <p class="font-medium text-gray-700">
                            {#if $userStore.createdAt}
                                {new Date($userStore.createdAt).toLocaleDateString()}
                            {:else}
                                N/A
                            {/if}
                        </p>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-sm text-gray-400">User ID</p>
                        <p class="font-mono text-xs text-gray-600 break-all whitespace-nowrap">{$userStore.id || "N/A"}</p>
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <p class="text-sm text-gray-400">Group Chats</p>
                        <p class="font-medium text-green-700">
                            {(userGroupchats || []).length} active group{(userGroupchats?.length === 1 ? "" : "s")}
                        </p>
                    </div>
                </div>

				<!-- Group List Preview -->
				{#if $userStore.userGroupchats && $userStore.userGroupchats.length > 0}
					<div class="w-full bg-blue-50 rounded p-4 mb-6">
						<p class="font-semibold text-blue-600 mb-2">Your Groups:</p>
						<ul class="list-disc pl-5 text-gray-700 space-y-1">
							{#each $userStore.userGroupchats.slice(0, 3) as group}
								<li>{group.name}</li>
							{/each}
							{#if $userStore.userGroupchats.length > 3}
								<li class="text-gray-400">...and {($userStore.userGroupchats.length - 3)} more</li>
							{/if}
						</ul>
					</div>
				{/if}
				<!-- Actions -->
				<div class="flex gap-4 w-full justify-center">
					<a
						href="/chat"
						class="bg-green-500 text-center flex justify-center items-center hover:bg-green-400 transition px-6 py-3 rounded-md text-white font-bold shadow"
					>
						Go to Chat
					</a>
					<LogoutButton/>
				</div>
			</div>
		{:else}
			<!-- Not logged in -->
			<div class="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-lg w-full mt-12">
				<h2 class="text-2xl font-bold text-blue-700 mb-4">Willkommen zu ChatApp</h2>
				<p class="text-gray-600 mb-8 text-center">Please <a href="/login" class="text-green-600 underline">log in</a> to see your profile and group chats.</p>
				<a
					href="/login"
					class="bg-blue-500 hover:bg-blue-400 transition px-6 py-3 rounded-md text-white font-bold shadow"
				>
					Log In
				</a>
			</div>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="w-full text-center text-gray-400 py-6 mt-10 text-sm">
		&copy; {new Date().getFullYear()} ChatApp &mdash; All rights reserved by Ruben Olaru & Fynn Böckers.
	</footer>
</div>
