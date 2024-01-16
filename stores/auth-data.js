import { defineStore } from "pinia";
export const useAuthDataStore = defineStore("authData", () => {
    const authData = ref({})
    const setAuthData = (val) => { authData.value = val }
    const $resetAuthData = () => { authData.value = {} }

    return { authData, setAuthData, $resetAuthData }
}, { persist: true })