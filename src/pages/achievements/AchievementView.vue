<script setup lang="ts">
import AchievementDeleteButton from '@/components/achievements/AchievementDeleteButton.vue';
import AchievementEditForm from '@/components/achievements/AchievementEditForm.vue';
import AchievementGive from '@/components/achievements/AchievementGiveForm.vue';
import AchievementPictureForm from '@/components/achievements/AchievementPictureForm.vue';
import AchievementReceivers from '@/components/achievements/AchievementReceiversTable.vue';

import { useAchievementStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, computed } from 'vue';

const achievementStore = useAchievementStore();
const { achievement } = storeToRefs(achievementStore);

const reload = async () => {
	const id = Number(document.URL.split('/').at(-1));
	await achievementStore.requestAchievement(id);
};

onMounted(reload);
onUpdated(reload);

const id = computed(() => achievement.value.id);
const name = computed(() => achievement.value.name);
const description = computed(() => achievement.value.description);
const owner_user_id = computed(() => achievement.value.owner_user_id);
const pictureLink = computed(() => {
	return achievement.value.picture
		? `${import.meta.env.VITE_AUTH_API_BASE_URL}/achievement/${achievement.value.picture}`
		: '';
});
</script>

<template>
	<h1>{{ id }}. {{ name }} | Создана {{ owner_user_id }}</h1>
	<p>{{ description }}</p>
	<img :src="pictureLink ?? ''" widht="128" height="128" />

	<AchievementEditForm :id="id" />
	<AchievementPictureForm :id="id" />
	<AchievementDeleteButton :id="id" />
	<AchievementGive :defined-achievement="id" />
	<AchievementReceivers :achievement-id="id" />
</template>

<style lang="css" scoped></style>
