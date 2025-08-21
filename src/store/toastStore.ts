import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
    interface Toast {
        text: string,
        timeout?: number,
        color?: string,
    }

    const queue = ref<Toast[]>([]);

    function add(message: Toast) {
        queue.value.push(message);
    }

    function success(text: string) {
        queue.value.push({
            text,
            timeout: 2000,
            color: "success",
        })
    }

    function error(text: string) {
        queue.value.push({
            text,
            timeout: 2000,
            color: "error",
        })
    }

    return {
        queue,
        add,
        error,
        success
    }
})