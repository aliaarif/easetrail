<script setup>
import { useDropdownStore } from "@/stores/dropdown";
const dropdownStore = useDropdownStore();
const { item } = useCommon()
const emit = defineEmits()
const props = defineProps({
    stateName: String,
    cityName: String
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
    const { data: localities } = await useAsyncData('localities',
    () => {
        return $fetch(`/api/localities?state=${props.stateName}&city=${props.cityName}`, {
            method: 'get'
        })
    },
    )
})
const { data: localities } = await useAsyncData('localities',
    () => {
        return $fetch(`/api/localities?state=${dropdownStore.dropdown.state}&city=${dropdownStore.dropdown.city}`, {
            method: 'get'
        })
    },
)
const cityDropBox = ref(false)
const filteredLocalities2 = ref([])
const selLocality = ref('')
const filterLocalities2 = (selectedCity) => {
    selLocality.value = selectedCity
    if (dropdownStore.dropdown.locality.length > 1) {
        cityDropBox.value = true;
        filteredLocalities2.value = localities.value.filter(filterLocalities22)
    }
}
const filterLocalities22 = (item) => {
    return slugify(item.name).startsWith(slugify(selLocality.value));
}
const selectCity2 = async (newCity) => {
    dropdownStore.dropdown.locality = newCity
    cityDropBox.value = false
    emit('childEvent', dropdownStore.dropdown.locality) 
}
const triggerParentMethod = () => {
      emit('childEvent', dropdownStore.dropdown.locality) // Emitting an event to the parent
}
</script>
<template>
    <section>
        <input v-model="dropdownStore.dropdown.locality" class="input is-small" type="text" placeholder="Select Location"
            autocomplete="off" @input="filterLocalities2(dropdownStore.dropdown.locality), triggerParentMethod('localities'), onlyAlphaNumber" />
        <div v-if="filteredLocalities2 && cityDropBox" class="navbar-dropdown">
            <a v-for="item1 in filteredLocalities2" :key="item1._id" class="navbar-item mr-2" @click="selectCity2(item1.name)">
                {{ item1.name }}
            </a>
        </div>
    </section>
</template>