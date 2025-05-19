// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { UserDTO } from '$lib/api/Api';

export const user = writable<UserDTO | undefined>(undefined);