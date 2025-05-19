<script lang="ts">
	//import { USERNAME } from "$env/static/private";
    import type { MessageDTO } from "$lib/api/Api";
	import { user } from "$lib/stores/userStore";

    interface Props {
        message: MessageDTO;
    }

    let { message }: Props = $props();
    let messageText = message.content;
    let command = "";

    if (message.content.charAt(0) == "/") {
        [command, messageText] = message.content.split(";");
        command = command.slice(1);
    }

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

    const color = colorMap[command] || "bg-gray-300";

    // Dynamisch erkennen, ob Nachricht vom eigenen Nutzer stammt
    const currentUserId = $user?.id;
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
        </div>
    </div>
</div>
