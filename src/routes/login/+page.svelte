<script lang="ts">
    import "../../app.css"
    import { userStore } from "$lib/stores/userStore";
	import { onMount } from "svelte";

    onMount(() => {
        if($userStore){
            window.location.pathname = "/"
        }
    })

</script>
<div class="h-[100vh] flex justify-center items-center" >
    
    <div class="bg-gray-300 w-[50%] h-[60%] rounded-sm flex flex-col justify-center items-center p-4">
		<h2 class="text-xl font-semibold mb-4">User Info</h2>
        <a href="http://localhost:5191/api/v1/Auth/signin/bosch?returnUrl=http://localhost:5173/chat" class="bg-[#007BC0] w-[10rem]  cursor-pointer rounded-md flex justify-center p-5 text-lg font-bold text-white">
        <p>Bosch SSO</p>
    </a>
</div>
</div>
