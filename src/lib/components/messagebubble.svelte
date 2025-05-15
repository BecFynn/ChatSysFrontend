<script lang="ts">
    import type {MessageDTO} from "$lib/api/Api";

    interface Props{
        message : MessageDTO
    }

     let {message} : Props = $props()
    //falls benutzer id eigene benutzerID
   
    const colorMap: Record<string, string> = {
        red: "bg-red-300",
        green: "bg-green-300",
        blue: "bg-blue-300",
        yellow: "bg-yellow-300",
        gray: "bg-gray-300"
    };
 
    let left=false
    
    const color = colorMap[Math.floor(Math.random()* Object.keys(colorMap).length - 1) + 1] || "bg-gray-300";
</script>
<div class="flex"  class:justify-end={left}>
<div class="{color} w-auto p-2 m-2 rounded-lg ">
    {message.content}
</div>
</div>