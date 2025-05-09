<script lang="ts">
    export let data
</script>

<div class="bg-white h-[6rem] rounded-lg flex flex-col py-1 px-3 cursor-pointer select-none">
    <div class="flex flex-row justify-between font-semibold">
        <p>General Chat</p>
        <div class="bg-green-400 hidden h-6 w-6 rounded-full text-center flex justify-center items-center">
            <p class="text-sm font-bold text-white">5</p>
        </div>
    </div>
    <div class="flex flex-row px-2 justify-">
    
        <div class="bg-white h-16 w-16 justify-self-start">
            <img src="https://api.dicebear.com/9.x/open-peeps/svg?seed=string" class="h-16 w-16" alt="user img">
        </div>
        <div class="flex justify-center items-center bg-redx-500 w-full">
            <p class="text-lg">Peter Schmid</p>
        </div>
    </div>
</div>