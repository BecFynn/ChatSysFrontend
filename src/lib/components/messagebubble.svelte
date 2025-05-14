<script lang="ts">
    import type {MessageDTO} from "$lib/api/Api";
    export let message
    //falls benutzer id eigene benutzerID 
    let left=false
</script>
<div class="flex"  class:justify-end={left}>
<div class="bg-lightgray bg-gray-300 w-auto p-2 m-2 rounded-lg ">
    {message}
</div>
</div>