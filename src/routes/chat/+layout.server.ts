import { Api } from "$lib/api/Api";

const api = new Api({
    baseURL:"http://localhost:5191"
})

export async function load() {
    const user = await api.userId.userDetail("09f6770d-ae80-4779-bae7-34e58ef3cf4c").then(r => r.data)

    return { user };
  }