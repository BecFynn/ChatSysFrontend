// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { GroupchatDTO } from '$lib/api/Api';

export const groupChatStore = writable<GroupchatDTO[]>([]);