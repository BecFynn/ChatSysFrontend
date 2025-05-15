<script lang="ts">
    import type {MessageDTO} from "$lib/api/Api";
    export let message
    //falls benutzer id eigene benutzerID 
    
    const colorMap: Record<string, string> = {
        red: "bg-red-300",
        green: "bg-green-300",
        blue: "bg-blue-300",
        yellow: "bg-yellow-300",
        gray: "bg-gray-300"
    };

    let left=false
    const [colorKey,messageText] = message.content.split(";");
    const color = colorMap[colorKey] || "bg-gray-300";
</script>
<div class="flex"  class:justify-end={left}>
<div class="{color} w-auto p-2 m-2 rounded-lg ">
    {messageText}
</div>
</div>