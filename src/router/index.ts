import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('../pages/StartScreen.vue'),
	},
	{
		path: '/achievements',
		component: () => import('../pages/achievements/AchievementsList.vue'),
	},
	{
		path: '/achievements/:id',
		component: () => import('../pages/achievements/AchievementView.vue'),
	},
	{
		path: '/achievements/create',
		component: () => import('../pages/achievements/AchievementCreate.vue'),
	},
	{
		path: '/achievements/give',
		component: () => import('../pages/achievements/AchievementGive.vue'),
	},
	{
		path: '/achievements/user/:id',
		component: () => import('../pages/achievements/UserAchievements.vue'),
	},
	{
		path: '/debug',
		component: () => import('../pages/Debug.vue'),
	}
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(to => {
	console.log(to);
});
