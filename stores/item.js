import { defineStore } from "pinia";
export const useItemStore = defineStore("item", () => {
    const item = ref({
        // state: 'Haryana',
        // city:'Gurugram',
        // name:'Sector 15'
    })
    const setItem = (val) => { item.value = val }
    const $resetItem = () => { item.value = {} }

    return { item, setItem, $resetItem }
}, { persist: true })