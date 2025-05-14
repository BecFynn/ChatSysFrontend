import { Api } from "$lib/api/Api";

const api = new Api({
    baseURL:"http://localhost:5191"
})

export async function load() {
    const user = await api.userId.userDetail("bca51728-850f-4704-a881-9623e3c9a5c3").then(r => r.data)

    return { user };
  }