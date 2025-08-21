<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { onMounted, onUpdated } from 'vue';

const props = defineProps({
	userId: { type: Number, required: true },
});

const achievementStore = useAchievementStore();

const reload = async () => {
	await achievementStore.requestUserAchievements(props.userId);
};

onMounted(reload);
onUpdated(reload);
</script>

<template>
	<h1>Пользователь {{ userId }}</h1>
	<v-table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Название</th>
				<th>Описание</th>
				<th>Ссылка на иконку</th>
				<th>ID создателя</th>
				<th>Действия</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="{ id, name, description, picture, owner_user_id } in achievementStore.userAchivements" :key="id">
				<td>{{ id }}</td>
				<td>{{ name }}</td>
				<td>{{ description }}</td>
				<td>{{ picture }}</td>
				<td>{{ owner_user_id }}</td>
				<td>
					<v-btn @click="achievementStore.revokeReceiver(id, userId)">Отозвать</v-btn>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style lang="css" scoped></style>
