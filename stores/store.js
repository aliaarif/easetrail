import { defineStore } from "pinia";
export const useStore = defineStore("store", () => {
    const isAuthenticated = ref({})
    const setAuthenticated = (val) => { isAuthenticated.value = val }
    const $resetAuthenticated = () => { isAuthenticated.value = {} }

    const isAuthData = ref({})
    const setAuthData = (val) => { isAuthData.value = val }
    const $resetAuthData = () => { isAuthData.value = {} }

    return { isAuthData, setAuthData, $resetAuthenticated, isAuthData, setAuthData, $resetAuthData }
})