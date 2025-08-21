<script setup lang="ts">
import { useProfileStore, useToastStore } from './store';
import { onMounted } from 'vue';

const profileStore = useProfileStore();
const toastStore = useToastStore();

onMounted(() => {
	profileStore.setupAdminSession(null);
});
</script>

<template>
	<v-app class="container">
		<main class="main">
			<Suspense>
				<RouterView />
			</Suspense>
		</main>
		<v-snackbar-queue v-model="toastStore.queue"></v-snackbar-queue>
	</v-app>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
}
</style>
