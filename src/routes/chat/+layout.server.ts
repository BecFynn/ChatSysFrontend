import { Api } from "$lib/api/Api";

const api = new Api({
    baseURL:"http://localhost:5191"
})

export async function load() {
    const user = await api.userId.userDetail("7092e09f-fd30-41c4-a27a-2b4cff6c8aa3").then(r => r.data)
    return { user };
  }