<script lang="ts">
	import "../../app.css"
	import ChatListItem from "./ChatListItem.svelte";

   
</script>

<div class="min-w-[15rem] w-[30%] max-w-[19rem] bg-[#D9D9D9] flex flex-col p-5">
	<div class="flex justify-center items-center text-bold mb-5 text-xl">
		<p>Chats</p>
	</div>
	<ChatListItem data={{text: "Böser Mann"}}/>
</div>