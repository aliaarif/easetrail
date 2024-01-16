import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(true)

    const setAuthenticated = (val) => {
        isAuthenticated.value = val
    }

    const $resetAuthenticated = () => {
        isAuthenticated.value = false
    }

    return { isAuthenticated, setAuthenticated, $resetAuthenticated }
}, { persist: true })