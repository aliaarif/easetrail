import { defineStore } from "pinia";
export const useDropdownStore = defineStore("dropdown", () => {
    const dropdown = ref({})
    const setDropdown = (val) => { dropdown.value = val }
    const $resetDropdown = () => { dropdown.value = {} }

    return { dropdown, setDropdown, $resetDropdown }
}, { persist: true })