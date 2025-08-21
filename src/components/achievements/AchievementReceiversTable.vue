<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { onMounted, onUpdated } from 'vue';

const achievementStore = useAchievementStore();

const props = defineProps({
	achievementId: { type: Number, required: true, default: 1 },
});

const reload = async () => {
	await achievementStore.requestReceivers(props.achievementId);
};

onMounted(reload);
onUpdated(reload);
</script>

<template>
	<h2>Получатели достижения {{ achievementId }}</h2>
	<v-table>
		<thead>
			<tr>
				<th>User Id</th>
				<th>Действия</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="{ user_id } in achievementStore.receivers" :key="user_id">
				<td>{{ user_id }}</td>
				<td>
					<v-btn @click="achievementStore.revokeReceiver(achievementId, user_id)">Отозвать</v-btn>
					<v-btn @click="$router.push(`/achievements/user/${user_id}`)">Подробнее</v-btn>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style lang="css" scoped></style>
