<script setup lang="ts">
import { router } from '@/router';
import { useAchievementStore } from '@/store';
import { Ref } from 'vue';

const props = defineProps({
	id: { type: Number, required: true },
});
const achievementStore = useAchievementStore();

async function confirmDeletion(isActive: Ref<boolean>) {
	await achievementStore.deleteAchievement(props.id);

	isActive.value = false;
	router.push('/achievements');
}

async function dismissDeletion(isActive: Ref<boolean>) {
	isActive.value = false;
}
</script>

<template>
	<v-dialog>
		<template #activator="{ props: activatorProps }">
			<v-btn v-bind="activatorProps" color="secondary">Удалить</v-btn>
		</template>

		<template #default="{ isActive }">
			<h1>Удалить {{ id }}?</h1>
			<p>
				<v-btn @click="dismissDeletion(isActive)">Нет</v-btn>
				<v-btn @click="confirmDeletion(isActive)">Да</v-btn>
			</p>
		</template>
	</v-dialog>
</template>

<style lang="css" scoped></style>
