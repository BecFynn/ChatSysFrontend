// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { UserDTO } from '$lib/api/Api';

export const directChatStore = writable<UserDTO[]>([]);