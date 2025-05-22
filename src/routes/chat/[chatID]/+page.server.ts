import type { PageServerLoad, PageServerLoadEvent } from './$types';
import { Api } from '$lib/api/Api';
import { redirect } from '@sveltejs/kit';
import { ApiProvider } from '$lib/provider/ApiProvider';


export const load: PageServerLoad = async ({ params, cookies } : PageServerLoadEvent) => {

	const api = new ApiProvider(cookies.getAll()).api;
	const chatData = await api.messageList({target: params.chatID}).then(r => r.data)

	console.log(chatData)

	return {
		chatData
	};
};
