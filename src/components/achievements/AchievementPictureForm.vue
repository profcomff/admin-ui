<script setup lang="ts">
import { useAchievementStore } from '@/store';
const props = defineProps({
	id: { type: Number, required: true },
});
const achievementStore = useAchievementStore();

async function changeImage() {
	const picInput = (document.getElementById('picture_file') as HTMLFormElement).files[0];
	await achievementStore.changePicture(props.id, picInput);
}
</script>

<template>
	<form id="achievement-pic" @submit.prevent>
		<h2>Загрузить новую картинку</h2>
		<p>
			<label for="picture_file">Иконка</label>
			<input type="file" id="picture_file" name="picture_file" accept="image/png" />
		</p>
		<v-btn @click="changeImage">Отправить</v-btn>
	</form>
</template>

<style lang="css" scoped></style>
