<script lang="ts">
	let { children } = $props();
	import { ApiProvider } from '$lib/provider/ApiProvider';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/userStore';
	const api = new ApiProvider().api

	onMount(() => {

		async function fetchMe() {
			try {
				const res = await api.auth.v1AuthMeList();
				console.log(res.data)
				user.set(res.data)
				console.log("From layout")
			} catch (err) {
				console.error("Failed to fetch user data:", err);
                window.location.href = "/login";
			}
		}

		fetchMe();
	});
</script>

{@render children()}