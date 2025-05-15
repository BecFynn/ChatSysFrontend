<script lang="ts">
    import { page } from "$app/state";
	import type { GetMessagesReponse } from "$lib/api/Api";
	import MessageHistory from "$lib/components/MessageHistory.svelte";
    import Chatbox from "../../../lib/components/ChatInput.svelte";
	import type { PageProps } from "./$types";

    let props: PageProps = $props();

    

</script>
<MessageHistory chatData={props.data.chatData} />