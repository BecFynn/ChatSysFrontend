<script lang="ts">
	import type { UserDTO } from '$lib/api/Api';
	import { userStore } from '$lib/stores/userStore';
	interface Props {
		children: any,
		user: UserDTO,
	}
	let  { data, children }  = $props();

	
	// Sync store on load
	if (data.user) {
		userStore.set(data.user);
	}
</script>

{@render children()}