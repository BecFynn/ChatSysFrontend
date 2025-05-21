<script lang="ts">
    import type { MessageDTO } from "$lib/api/Api";
    import { userStore } from "$lib/stores/userStore";

    interface Props {
        message: MessageDTO;
    }

    let { message }: Props = $props();
    let messageText = message.content;
    let command = "";

    // Match strings that start with a command like "/red hello there"
    const match = message.content.match(/^\/(\w+)\s*;?\s*(.+)/);
    if (match) {
        command = match[1];      
        messageText = match[2];  
    }   

    //if(command == "dance"){
    //    window.open("https://bos.ch/leckerkeks", "_blank")
    //}

    const colorMap: Record<string, string> = {
        red: "bg-red-300",
        green: "bg-green-300",
        blue: "bg-blue-300",
        yellow: "bg-yellow-300",
        gray: "bg-gray-300",
        spin: "animate-spin bg-gray-300",
        ping: "animate-ping bg-gray-300",
        pulse: "animate-pulse bg-gray-300",
        bounce: "animate-bounce bg-gray-300"
    };

    let imageUrl: string | null = null;

    // Simple regex to detect image URLs
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;

    const imageMatch = messageText.match(imageRegex);
    if (imageMatch) {
        imageUrl = imageMatch[1];
    }

    
    const color = colorMap[command] || "bg-gray-300";

    const currentUserId = $userStore?.id;
    let left = message.sender?.id !== currentUserId;
</script>

<div class="flex w-full mb-2" class:justify-start={left} class:justify-end={!left}>
    <div class="flex items-center gap-2" class:flex-row={left} class:flex-row-reverse={!left}>
            <div class="h-12 w-12 rounded-sm bg-gray-100 shrink-0">
            <img src={message.sender?.avatar} alt={message.sender?.id} class="w-full h-full object-cover rounded-sm" />
        </div>

        <div class="{color} max-w-[60%] px-3 py-2 rounded-lg">
            <p class="font-bold text-lg">{message.sender?.displayName}</p>
            <p>{messageText}</p>
            
            {#if imageUrl}
                <img src={imageUrl} alt="linked image" class="mt-2 rounded max-w-full" />
            {/if}
        </div>
    </div>
</div> 