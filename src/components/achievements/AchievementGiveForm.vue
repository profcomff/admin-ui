<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps<{
	definedAchievement?: number;
	definedReceiver?: number;
}>();

const achievementId = ref(0);
const receiverId = ref(0);

onMounted(() => {
	achievementId.value = props.definedAchievement ?? 0;
	receiverId.value = props.definedReceiver ?? 0;
});

onUpdated(() => {
	if (props.definedAchievement) {
		achievementId.value = props.definedAchievement;
	}
	if (props.definedReceiver) {
		receiverId.value = props.definedReceiver;
	}
});

const achievementStore = useAchievementStore();
</script>

<template>
	<form action="submit">
		<p>
			<label for="achievement-id">Номер достижения</label>
			<input
				v-model="achievementId"
				type="number"
				name="achievement_id"
				id="achievement-id"
				:disabled="!!definedAchievement"
			/>
		</p>
		<p>
			<label for="user-id">User id</label>
			<input v-model="receiverId" type="number" name="user_id" id="user-id" :disabled="!!definedReceiver" />
		</p>
		<v-btn @click="achievementStore.createReceiver(achievementId, receiverId)">Выдать</v-btn>
	</form>
</template>

<style lang="css" scoped></style>
