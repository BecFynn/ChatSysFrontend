import { apiBaseUrl, fallbackReturnUrl } from "$lib/config";
import { ApiProvider } from "$lib/provider/ApiProvider";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./chat/$types";
import type { UserDTO } from "$lib/api/Api";
import type { LayoutServerData } from "./$types";

export const load: LayoutServerLoad = async (context : ServerLoadEvent) => {
    if (context.cookies.getAll().length === 0 && context.request.headers.get("Authorization") === null) {
        console.log("user has no cookies --> login");
        console.log(context.route.id)
        if(context.route.id == "/login"){
             return {
            login: true,
            user: null as unknown as UserDTO,
            currentUserId: null as unknown as string,
        }
        }else{
            return redirect(302, "http://localhost:5173/login");
        }
       
    }

    const api = new ApiProvider(context.cookies.getAll()).api;

    let user;
    try {
        user = await api.auth.v1AuthMeList();
        console.log({user});
    } catch (e) {
        console.log("user auth request failed --> login 2", e);

         if(context.route.id == "/login"){
             return {
            login: true,
            user: null as unknown as UserDTO,
            currentUserId: null as unknown as string,
        }
        }else{
            return redirect(302, "http://localhost:5173/login");
        }
    }

    if(context.route.id == "/chat"){
        return redirect(302, `/chat/${user.data.id}`);
    }

    return {
        login: false,
        user: user.data,
        currentUserId: user.data?.id,
    };
};

function getOAuthRedirect(context: ServerLoadEvent) {
    const loginUrl = new URL(`${apiBaseUrl}/api/v1/Auth/signin/bosch`);
    let currentUri = context.url ?? new URL(fallbackReturnUrl);

    if (currentUri.hostname === "undefined") {
        currentUri = new URL(fallbackReturnUrl);
    }

    if (currentUri.hostname === "localhost") {
        currentUri.protocol = "http";
    }

    loginUrl.searchParams.set("ReturnUrl", currentUri.toString());
    console.log("Redirecting to", loginUrl.toString());
    return redirect(302, loginUrl.toString());
}
