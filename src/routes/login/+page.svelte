<script lang="ts">
    import "../../app.css"
    let query = $state("");           // input field state
    let finalQuery = $state("");      // only updates on Enter key

</script>
<div class="h-[100vh] flex justify-center items-center" >
    <a href="http://localhost:5191/api/v1/Auth/signin/bosch?returnUrl=http://localhost:5173/chat" class="bg-[#007BC0] w-[10rem]  cursor-pointer rounded-md flex justify-center p-5 text-lg font-bold text-white">
        <p>Bosch SSO</p>
    </a>
</div>
