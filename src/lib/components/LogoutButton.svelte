<script lang="ts">
    import
     { userStore } from '$lib/stores/userStore';

    function handleLogout() {
        // Clear user store
        userStore.set(undefined);

        // Redirect to logout URL
        window.location.href = 'http://localhost:5191/api/v1/Auth/signout?returnUrl=http://localhost:5173/login';
    }
</script>

<button
    onclick={handleLogout}
    class="bg-blue-500 hover:bg-blue-400 cursor-pointer p-4 flex justify-center items-center rounded-md text-white font-bold"
>
    <p>Logout</p>
</button>
