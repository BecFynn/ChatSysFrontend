// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { UserDTO } from '$lib/api/Api';

export const userStore = writable<UserDTO | undefined>(undefined);