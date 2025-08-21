<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { ref } from 'vue';

const achievementStore = useAchievementStore();

const name = ref('');
const description = ref('');

async function createAchievement() {
	const pic = (document.getElementById('pic') as HTMLFormElement).files[0];
	await achievementStore.create(name.value, description.value, pic);
}
</script>

<template>
	<form id="form-create" action="submit">
		<p>
			<label for="name">Название</label>
			<input v-model="name" type="text" name="name" id="name" />
		</p>
		<p>
			<label for="description">Описание</label>
			<input v-model="description" type="text" name="description" id="description" />
		</p>
		<p>
			<label for="photo">Иконка</label>
			<input type="file" name="picture_file" id="pic" />
		</p>
		<v-btn @click="createAchievement">Создать</v-btn>
	</form>
</template>

<style lang="css" scoped></style>
