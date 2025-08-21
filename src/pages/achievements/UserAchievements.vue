<script setup lang="ts">
import UserAchievementsTable from '@/components/achievements/UserAchievementsTable.vue';
import { ref, onMounted, onUpdated } from 'vue';

const userId = ref(1);

const reload = () => (userId.value = Number(document.URL.split('/').at(-1)));

onMounted(reload);
onUpdated(reload);
</script>

<template>
	<UserAchievementsTable :user-id="userId" />
</template>

<style lang="css" scoped></style>
