<script lang="ts">
    import { groupChatStore } from '$lib/stores/groupChatStore';
    import { ApiProvider } from '$lib/provider/ApiProvider';
    import { goto } from '$app/navigation';

    const api = new ApiProvider().api;
    let groupName = "";
    let loading = false;
    let error: string | null = null;

    async function addGroup(GroupName: string) {
        if (!GroupName.trim()) {
            error = "Bitte Namen eingeben";
            return;
        }
        loading = true;
        error = null;
        try {
            const newGroup = await api.groupCreate({ groupname: GroupName }).then(r => r.data);
            groupChatStore.update(groups => [...groups, newGroup]);
            groupName = "";
            await goto(`/chat/${newGroup.id}`);
        } catch (e) {
            error = "Fehler beim Erstellen.";
        } finally {
            loading = false;
        }
    }
</script>

<div class="py-10 bg-redx-500 h-[6rem] flex justify-center items-center ">
    <form
        class="flex items-center gap-2"
        on:submit|preventDefault={() => addGroup(groupName)}
        autocomplete="off"
    >
        <input
            bind:value={groupName}
            type="text"
            placeholder="Neue Gruppe"
            class="flex-1 px-3 py-1.5 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
            disabled={loading}
            maxlength="40"
        />
        <button
            type="submit"
            class="flex cursor-pointer items-center justify-center h-8 w-8 rounded-md bg-gradient-to-tr from-green-500 to-blue-500 text-white font-bold text-lg shadow hover:from-green-600 hover:to-blue-600 transition disabled:opacity-60"
            disabled={loading}
            aria-label="Gruppe erstellen"
        >
            {#if loading}
                <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
            {:else}
                +
            {/if}
        </button>
    </form>
    {#if error}
        <p class="text-red-500 text-xs mt-1 px-1">{error}</p>
    {/if}
</div>
