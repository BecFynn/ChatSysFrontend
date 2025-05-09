<script lang="ts">
    import "../../app.css"
    let query = $state("");           // input field state
    let finalQuery = $state("");      // only updates on Enter key

    let imgSrc = $derived(`https://api.dicebear.com/9.x/open-peeps/svg?seed=${finalQuery}`);
    
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            finalQuery = query;
        }
    }
</script>

<h1 class="text-orange-500 font-bold text-3xl">Login</h1>

<img src={imgSrc} class="h-32 w-32" />

<input
  placeholder="Gib einen Text ein"
  bind:value={query}
  on:keydown={handleKeydown}
  class="border-3 border-red-500"
/>
