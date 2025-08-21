import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { setupAuth } from '@profcomff/api-uilib';
import apiClient from '@/api';
import { useToastStore } from './toastStore';

export const useProfileStore = defineStore('profile', () => {
	const toastStore = useToastStore();

	const user_id = ref<number | null>(null);
	const email = ref<string | null>(null);
	const token = ref<string | null>(null);
	const groups = ref<number[] | null>(null);
	const indirectGroups = ref<number[] | null>(null);
	const userScopes = ref<string[] | null>(null);
	const sessionScopes = ref<string[] | null>(null);

	const full_name = ref<string | null>(null);

	const fromUrl = () => {
		const url = new URL(document.location.toString());
		const currToken = url.searchParams.get('token');
		const currId = url.searchParams.get('user_id');
		const currScopes = url.searchParams.get('scopes');
		if (currToken) {
			token.value = currToken;
		}
		if (currId) {
			user_id.value = +currId;
		}
		if (currScopes) {
			sessionScopes.value = currScopes.split(',');
		}
	};

	// if debugging, paste it here to avoid relogging
	const TVOI_FF_TEST_TOKEN = '';

	async function setupAdminSession(tvff_token: string | null) {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const { data } = await apiClient.GET('/auth/me');
			if (data) {
				setupAuth(storedToken);
				toastStore.success('Логин из сохраненной сессии успешен');
				return;
			}
			toastStore.error('Сохраненная сессия истекла, залогиньтесь заново');
			localStorage.removeItem('token');
		}

		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);

		const serviceScopes = [
			'achievement.edit',
			'achievement.give',
			'achievement.revoke',
			'achievement.delete',
			'achievement.create',
		];
		const serviceName = 'achievements';
		const scopes = serviceScopes.map(value => `${serviceName}.${value}`);
		const { data, error } = await apiClient.POST('/auth/session', {
			body: {
				scopes,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
			},
		});

		if (error) {
			toastStore.error((error.detail as unknown as string) ?? 'Что-то не так');
			return;
		}

		if (data) {
			user_id.value = data.id;
			token.value = data.token || '';
			sessionScopes.value = data.session_scopes ?? [];

			setupAuth(data.token || '');
			localStorage.setItem('token', data.token || '');
			toastStore.success('Сессия установлена и сохранена');
		}
	}

	async function setupUserSession(tvff_token: string | null) {
		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);
		toastStore.success('user logged');
	}

	const isLogged = computed(() => token.value && token.value !== '');

	return {
		user_id,
		email,
		token,
		groups,
		indirectGroups,
		userScopes,
		sessionScopes,

		full_name,

		isLogged,

		fromUrl,
		setupAdminSession,
		setupUserSession,
	};
});
