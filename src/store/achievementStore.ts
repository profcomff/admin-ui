import apiClient from "@/api";
import { Achievement, Receiver } from "@/models/achievements";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStore } from "./toastStore";

export const useAchievementStore = defineStore("achievement", () => {
    const toastStore = useToastStore();

    const defaultAchievement: Achievement = {
        id: 0,
        name: "Дефолтная ачивка",
        description: 'Когда ничего другого не загрузилось',
        picture: null,
        owner_user_id: 177,
    }

    const allAchievements = ref<Achievement[]>([]);
    const achievement = ref<Achievement>(defaultAchievement);
    const receivers = ref<Receiver[]>([]);
    const userAchivements = ref<Achievement[]>([]);

    async function requestAllAchievements() {
        const { data, error } = await apiClient.GET('/achievement/achievement');
        if (error) {
            toastStore.error(error);
            return;
        }
        allAchievements.value = data.sort((a, b) => a.id - b.id);
    }

    async function requestAchievement(id: number) {
        const { data, error } = await apiClient.GET('/achievement/achievement/{id}', {
            params: { path: { id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        achievement.value = data;
    }

    async function create(name: string, description: string, picture_file: File | null) {
        const { data, error } = await apiClient.POST("/achievement/achievement", {
            body: { name, description }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        if (!picture_file) {
            toastStore.success(`Достижение ${data.id} создано! Фотографию можно дозагрузить на странице достижения`);
            return data;
        }
        toastStore.success(`Достижение ${data.id} создано! Загружаем иконку...`);
        return changePicture(data.id, picture_file);
    }

    async function edit(id: number, name: string, description: string) {
        const { data, error } = await apiClient.PATCH('/achievement/achievement/{id}', {
            params: { path: { id } },
            body: { name, description }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        achievement.value = data;
        toastStore.success(`Достижение ${id} изменено. Иконка меняется отдельно`);
    }

    async function changePicture(id: number, picture_file: File) {
        const formData = new FormData();
        formData.append('picture_file', picture_file);
        const { data, error } = await apiClient.PATCH('/achievement/achievement/{id}/picture', {
            params: { path: { id } },
            body: formData as never,
        });
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        toastStore.success(`Фотография достижения ${id} изменена`);
        achievement.value = data;
        return data;
    }

    async function deleteAchievement(id: number) {
        const { error } = await apiClient.DELETE('/achievement/achievement/{id}', {
            params: { path: { id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        toastStore.success(`Достижение ${id} удалено`);
    }

    async function requestReceivers(achievement_id: number) {
        const { data, error } = await apiClient.GET("/achievement/achievement/{achievement_id}/reciever", {
            params: { path: { achievement_id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        receivers.value = data.recievers;
    }

    async function createReceiver(achievement_id: number, user_id: number) {
        const { data, error } = await apiClient.POST('/achievement/achievement/{achievement_id}/reciever/{user_id}', {
            params: { path: { achievement_id, user_id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        toastStore.success(`Ачивка ${achievement_id} выдана пользователю ${user_id}`);
        receivers.value = data.recievers;
    }

    async function revokeReceiver(achievement_id: number, user_id: number) {
        const { data, error } = await apiClient.DELETE('/achievement/achievement/{achievement_id}/reciever/{user_id}', {
            params: { path: { achievement_id, user_id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg);
            return;
        }
        toastStore.success(`Ачивка ${achievement_id} забрана у пользователю ${user_id}`);
        receivers.value = data.recievers;
        await requestUserAchievements(user_id);
    }

    async function requestUserAchievements(user_id: number) {
        const { data, error } = await apiClient.GET('/achievement/user/{user_id}', {
            params: { path: { user_id } }
        })
        if (error) {
            toastStore.error(error.detail![0].msg ?? "Неизвестная ошибка");
            return;
        }
        userAchivements.value = data.achievement.sort((a, b) => a.id - b.id);
    }

    return {
        allAchievements,
        achievement,
        receivers,
        userAchivements,

        requestAllAchievements,

        requestAchievement,
        create,
        edit,
        changePicture,
        deleteAchievement,

        requestReceivers,
        createReceiver,
        revokeReceiver,

        requestUserAchievements,
    }
})