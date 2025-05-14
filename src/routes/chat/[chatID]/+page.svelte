<script>
    import { page } from "$app/state";
	import MessageHistory from "$lib/components/MessageHistory.svelte";
    import Chatbox from "../../../lib/components/ChatInput.svelte";

    export let data;



</script>
<MessageHistory chatData = {data.chatData}/>