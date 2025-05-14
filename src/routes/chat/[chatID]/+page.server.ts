import type { PageServerLoad } from './$types';
import { Api } from '$lib/api/Api';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ params }) => {

	console.log(params.chatID)

	if(!params.chatID){
		redirect(300, "/login")
	}

	let api = new Api({
		baseURL:"http://localhost:5191"
	})

	let chatData = await api.messageList({target: params.chatID}).then(r => r.data)

	console.log(chatData)

	return {
		chatID: params.chatID,
		chatData: chatData
	};
};
