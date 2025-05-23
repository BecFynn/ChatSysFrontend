<script lang="ts">
    import "../../app.css"
    import { Api, type GroupchatDTO, type UserDTO } from '$lib/api/Api';
    import { onMount } from 'svelte';
    import AddGroupchat from "./AddGroupchat.svelte";
    import ChatListItem from "./ChatListItem.svelte";
    import GroupchatListItem from "./GroupchatListItem.svelte";
    import { ApiProvider } from "$lib/provider/ApiProvider";
	import { groupChatStore } from "$lib/stores/groupChatStore";
	import { directChatStore } from "$lib/stores/directChatStore";
    const api = new ApiProvider().api;

    let showDirectChats = true;
    let showGroupChats = true;

    function toggleDirectChats() {
        if (showDirectChats && !showGroupChats) return;
        showDirectChats = !showDirectChats;
    }

    function toggleGroupChats() {
        if (!showDirectChats && showGroupChats) return;
        showGroupChats = !showGroupChats;
    }

    onMount(async () => {
        const userList = await api.userList().then(r => r.data);
        directChatStore.set(userList)

        const groupList = await api.myGroups.groupMyGroupsList().then(r => r.data);
        groupChatStore.set(groupList)
    });
</script>

<div class="h-screen overflow-y-auto min-w-[15rem] w-[30%] max-w-[19rem] bg-white shadow-md flex flex-col py-5">
    <div class="h-[90%]">
        <div class="flex flex-row justify-around font-bold mb-5 text-xl">
            <p>Chats</p>
        </div>
        <!-- Toggle Buttons -->
        <div class="flex justify-center gap-4 mb-4">
            <button
                class="px-4 py-2 rounded font-semibold transition cursor-pointer
                       {showDirectChats ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}"
                onclick={toggleDirectChats}
                aria-pressed={showDirectChats}
            >
                Direct Chats
            </button>
            <button
                class="px-4 py-2 rounded font-semibold transition cursor-pointer
                       {showGroupChats ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}"
                onclick={toggleGroupChats}
                aria-pressed={showGroupChats}
            >
                Group Chats
            </button>
        </div>

        <!-- Direct Chats List -->
        {#if showDirectChats}
            {#each $directChatStore as person}
                <ChatListItem person={person}/>
            {/each}
        {/if}

        <!-- Group Chats List and AddGroupchat Button -->
        {#if showGroupChats}
            {#each $groupChatStore as groupchat}
                <GroupchatListItem groupchat={groupchat} />
            {/each}
			<AddGroupchat/>
        {/if}
    </div>
</div>

