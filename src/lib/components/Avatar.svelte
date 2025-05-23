<script lang="ts">
	import type { UserDTO, UserDTOShort } from "$lib/api/Api";

  interface Props {
    myClass: string,
    person: UserDTOShort | UserDTO | UserDTO
  }

  const {  myClass, person} : Props = $props()
  const splitted = person.displayName?.split(" ")

  const myFallback = (splitted![0][0] + splitted![1][0]).toLocaleUpperCase()
  let imgError = $state()

  const handleError = () => {
    imgError = true;
  };
</script>

{#if imgError || !myFallback}
  <div class="h-12 w-12 rounded-md bg-gray-300 flex items-center justify-center text-md font-medium text-white ">
    {myFallback}
  </div>
{:else}
  <img
    src={person.avatar}
    alt={myFallback}
    class={myClass}
    on:error={handleError}
  />
{/if}
