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
    
    const color = colorMap[Math.floor(Math.random()* Object.keys(colorMap).length - 1) + 1] || "bg-gray-200";
</script>
<div class="flex flex-row items-center"  class:justify-end={left}>
    <div class="h-12 w-12 rounded-sm bg-gray-100 ">
        <img src={message.sender?.avatar} alt={`${message.sender?.id}`}>
    </div>
    <div class="{color} min-w-[10rem] flex flex-col w-auto px-3 py-2 m-2 rounded-lg h-[5rem]  ">
        <div class="bg-redx-500">
            <p class="font-bold text-lg">{message.sender?.displayName}</p>
        </div>
        <div class="bg-redx-500">
            <p class="">{message.content}</p>
        </div>
    </div>
</div>