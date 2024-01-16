<script setup>
import { useDropdownStore } from "@/stores/dropdown";
const dropdownStore = useDropdownStore();
const { item } = useCommon()
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
const { data: states } = await useAsyncData('states',
    () => {
        return $fetch(`/api/states`, {
            method: 'get'
        })
    },
)
const stateDropBox = ref(false)
const filteredStates2 = ref([])
const selState = ref('')
const filterStates2 = (selectedState) => {
    selState.value = selectedState
    if (dropdownStore.dropdown.state.length > 1) {
        stateDropBox.value = true;
        filteredStates2.value = states.value.filter(filterStates22)
    }
}
const filterStates22 = (item) => {
    return slugify(item.name).startsWith(slugify(selState.value));
}
const selectState2 = async (newState) => {
    dropdownStore.dropdown.state = newState
    stateDropBox.value = false
}
</script>
<template>
    <section>
        <input v-model="dropdownStore.dropdown.state" class="input is-primary is-small" type="text" placeholder="Select Location"
            autocomplete="off" @input="filterStates2(dropdownStore.dropdown.state)" />
        <div v-if="filteredStates2 && stateDropBox" class="navbar-dropdown">
            <a v-for="item1 in filteredStates2" :key="item1._id" class="navbar-item mr-2" @click="selectState2(item1.name)">
                {{ item1.name }}
            </a>
        </div>
    </section>
</template>