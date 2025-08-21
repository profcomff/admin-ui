<script setup lang="ts">
import AchievementTable from '@/components/achievements/AchievementTable.vue';
</script>

<template>
	<div class="d-flex align-center justify-space-between px-2 py-2">
		<h1>Список достижений</h1>

		<div>
			<v-btn :prepend-icon="'mdi-plus'" density="default" @click="$router.push('/achievements/create')">
				Создать
			</v-btn>
			<v-btn :prepend-icon="'mdi-plus'" density="default" @click="$router.push('/achievements/give')">
				Выдать
			</v-btn>
		</div>
	</div>

	<AchievementTable />
</template>

<style scoped></style>
