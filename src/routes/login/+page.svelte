<script lang="ts">
    import "../../app.css";
    import { userStore } from "$lib/stores/userStore";
    import { onMount } from "svelte";
    import { ApiProvider } from "$lib/provider/ApiProvider";
	import type { AddUserRequest, CreateUserRequest } from "$lib/api/Api";

    const api = new ApiProvider().api;
    let isLogin = true;

    // Login form
    let loginEmail = "";
    let loginPassword = "";

    // Register form
    let name = "";
    let surname = "";
    let displayName = "";
    let ntUser = "";
    let email = "";
    let password = "";
    let repeatPassword = "";

    onMount(() => {
        if ($userStore) {
            window.location.pathname = "/";
        }
    });

    const handleRegister = async () => {
        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        const payload : CreateUserRequest= {
            name,
            surname,
            ntUser,
            email,
            password,
            repeatPassword
        };




        try {
            let create = await api.registerCreate(payload).then(r => r.data);
            window.location.pathname = "/"
            //isLogin = true;
        } catch (err) {
            alert("Registration failed.");
            console.error(err);
        }
    };

    const handleLogin = async () => {
        // Add login logic with your API
        //alert(`Login attempted for: ${loginEmail}`);

        const payload = {
            email: loginEmail,
            password: loginPassword
        }

        try {
            let login = await api.loginCreate(payload).then(r => r.data)
            console.log(login)
            window.location.pathname = "/"
        } catch (err) {
            alert("Login failed.");
            console.error(err);
        }

    };
</script>

<div class="h-[100vh] flex justify-center items-center bg-gray-100">
    <div class="bg-white w-full max-w-xl rounded-md shadow-md p-8 space-y-6">
        <h2 class="text-2xl font-bold text-center">User Access</h2>

        <!-- Tabs -->
        <div class="flex justify-center gap-6 mb-4">
            <button 
                class={`cursor-pointer px-4 py-2 rounded ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                onclick={() => isLogin = true}>
                Login
            </button>
            <button 
                class={`cursor-pointer px-4 py-2 rounded ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                onclick={() => isLogin = false}>
                Register
            </button>
        </div>

        <!-- Login Form -->
        {#if isLogin}
            <form onsubmit={handleLogin} class="space-y-4">
                <input type="email" placeholder="Email" bind:value={loginEmail} class="w-full p-2 border rounded" required />
                <input type="password" placeholder="Password" bind:value={loginPassword} class="w-full p-2 border rounded" required />
                <button type="submit" class="cursor-pointer w-full bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        {:else}
            <!-- Register Form -->
            <form onsubmit={(e) => {
                e.preventDefault()
                handleRegister()
            }} class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" bind:value={name} class="p-2 border rounded" required />
                    <input type="text" placeholder="Surname" bind:value={surname} class="p-2 border rounded" required />
                    <input type="text" placeholder="NT User" bind:value={ntUser} class="p-2 border rounded" required />
                </div>
                <input type="email" placeholder="Email" bind:value={email} class="w-full p-2 border rounded" required />
                <input type="password" placeholder="Password" bind:value={password} class="w-full p-2 border rounded" required />
                <input type="password" placeholder="Repeat Password" bind:value={repeatPassword} class="w-full p-2 border rounded" required />
                <button type="submit" class="w-full bg-green-600 text-white p-2 rounded">Register</button>
            </form>
        {/if}

        <!-- Bosch SSO Button -->
        <div class="pt-6 border-t">
            <a href="http://localhost:5191/api/v1/Auth/signin/bosch?returnUrl=http://localhost:5173/chat" 
                class="bg-[#007BC0] w-full block text-center cursor-pointer rounded-md p-3 text-lg font-bold text-white">
                Bosch SSO
            </a>
        </div>
    </div>
</div>
