<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { ref } from 'vue';

defineProps({
	id: { type: Number, required: true },
});

const achievementStore = useAchievementStore();

const newName = ref('');
const newDescription = ref('');
</script>

<template>
	<form id="achievement-info" @submit.prevent>
		<h2>Изменить достижение</h2>

		<p>
			<label for="name">Название</label>
			<input v-model="newName" name="name" id="name" />
		</p>

		<p>
			<label for="description">Описание</label>
			<input v-model="newDescription" name="description" id="description" />
		</p>
		<v-btn @click="achievementStore.edit(id, newName, newDescription)">Изменить</v-btn>
	</form>
</template>

<style lang="css" scoped></style>
