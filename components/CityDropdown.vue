<script setup>
import { useDropdownStore } from "@/stores/dropdown";
const dropdownStore = useDropdownStore();
const { item, edit, slug } = useCommon()
const emit = defineEmits()
const { onlyAlpha, onlyNumber, onlyAlphaNumber, onlyFacebook, onlyInstagram, onlyYoutube } = useValidation()
const props = defineProps({
    stateName: String
})
const slugify = (str) => {
    return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
}
const title = (str) => {
    var words = str ? str.split('-') : '';
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words ? words.join(' ') : '';
}
onUpdated( async () => {
    console.log(props.stateName)
    const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities?state=${props.stateName}`, {
            method: 'get'
        })
    },
    )
})
const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities?state=${dropdownStore.dropdown.state}`, {
            method: 'get'
        })
    },
)
const cityDropBox = ref(false)
const filteredCities2 = ref([])
const selCity = ref('')
const filterCities2 = (selectedCity) => {
    selCity.value = selectedCity
    if (dropdownStore.dropdown.city.length > 1) {
        cityDropBox.value = true;
        filteredCities2.value = cities.value.filter(filterCities22)
    }
}
const filterCities22 = (item) => {
    return slugify(item.name).startsWith(slugify(selCity.value));
}
const selectCity2 = async (newCity) => {
    dropdownStore.dropdown.city = newCity
    cityDropBox.value = false
    emit('childEvent', dropdownStore.dropdown.city) 
}
const triggerParentMethod = () => {
      emit('childEvent', dropdownStore.dropdown.city) // Emitting an event to the parent
}
</script>
<template>
    <section>
        <input v-model="dropdownStore.dropdown.city" class="input is-small" type="text" placeholder="Select Location"
            autocomplete="off" @input="filterCities2(dropdownStore.dropdown.city), triggerParentMethod('cities'), onlyAlphaNumber" />
        <div v-if="filteredCities2 && cityDropBox" class="navbar-dropdown">
            <a v-for="item1 in filteredCities2" :key="item1._id" class="navbar-item mr-2" @click="selectCity2(item1.name)">
                {{ item1.name }}
            </a>
        </div>
    </section>
</template>