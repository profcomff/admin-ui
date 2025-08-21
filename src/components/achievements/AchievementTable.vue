<script setup lang="ts">
import { useAchievementStore } from '@/store';
import { onMounted } from 'vue';

const achievementStore = useAchievementStore();

onMounted(async () => {
	await achievementStore.requestAllAchievements();
});
</script>

<template>
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
			<tr v-for="{ id, name, description, picture, owner_user_id } in achievementStore.allAchievements" :key="id">
				<td>{{ id }}</td>
				<td>{{ name }}</td>
				<td>{{ description }}</td>
				<td>{{ picture }}</td>
				<td>{{ owner_user_id }}</td>
				<td>
					<v-btn density="compact" text="Подробнее" @click="$router.push(`/achievements/${id}`)" />
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style lang="css" scoped></style>
