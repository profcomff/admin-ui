<script setup lang="ts">
import { ref } from 'vue';
import { useProfileStore } from '@/store';

const profileStore = useProfileStore();
const token = ref('');

async function setupSession() {
	await profileStore.setupAdminSession(token.value);
}
</script>

<template>
	<h1>Админка Твой ФФ</h1>
	<form id="auth" @submit.prevent>
		<h2>Сетап админской сессии</h2>
		<p>
			<label for="token">Токен</label>
			<input v-model="token" type="password" name="token" id="token" />
		</p>
		<v-btn @click="setupSession">Отправить</v-btn>
	</form>

	<v-btn @click="$router.push('/achievements')">Ачивки</v-btn>
</template>

<style lang="css">
.container {
	width: 100%;
	height: 100%;
}

form {
	border: 4px solid black;
	margin: 2px;
}

input {
	border: 2px solid black;
	margin: 2px;
}

button {
	margin: 2px;
}
</style>
