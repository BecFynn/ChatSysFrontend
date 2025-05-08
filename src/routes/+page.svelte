<script lang="ts">
    import { onMount } from "svelte";
    import { getSocket } from "$lib/util/socket";

    let messages: string[] = [];

    onMount(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.addEventListener("open", () => {
            socket.send("Hello from SvelteKit!");
        });

        socket.addEventListener("message", (event) => {
            messages = [...messages, event.data];
        });
    });
</script>


<h1 class="text-red-500 font-bold text-3xl">WebSocket Messages</h1>
<ul>
    {#each messages as msg}
        <li>{msg}</li>
    {/each}
</ul>
