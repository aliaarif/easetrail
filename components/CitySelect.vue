<script setup>
import { useAuthDataStore } from "@/stores/auth-data";
const authDataStore = useAuthDataStore();
const { auth, item, module } = useCommon()
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
const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities`, {
            method: 'get'
        })
    },
)
const cityDropBox = ref(false)
const filteredCities2 = ref([])
const selCity = ref('')
const filterCities2 = (selectedCity) => {
    selCity.value = selectedCity
    if (item.value.city.length > 1) {
        cityDropBox.value = true;
        filteredCities2.value = cities.value.filter(filterCities22)
    }
}
const filterCities22 = (item) => {
    return slugify(item.name).startsWith(slugify(selCity.value));
}
const selectCity2 = async (newCity) => {
    item.value.city = newCity
    authDataStore.authData.city = newCity
    cityDropBox.value = false;
    const { data: stateName } = await useAsyncData('stateName',
        () => {
            return $fetch(`/api/getStateName?name=${newCity}`, {
                method: 'get'
            })
        })
    item.value.state = stateName.value.state
}
const disabledFleg = ref(authDataStore.authData.lock)
</script>
<template>
    <section>
        <input v-model="auth.city" class="input is-primary is-small" type="text" placeholder="Select Location"
            autocomplete="off" @input="filterCities2(auth.city)" v-if="module == 'profile' && disabledFleg" :disabled="disabledFleg == true ? disabled : ''"/>
        <input class="input is-primary is-small" type="text" placeholder="Select Location 2"
            autocomplete="off"  v-else-if="module == 'profile' && auth.lock" :disabled="module == 'profile' ? 'disabled' : ''"/>
        <input v-model="item.city" class="input is-primary is-small" type="text" placeholder="Select Location"
            autocomplete="off" @input="filterCities2(item.city)" v-else />
        <div v-if="filteredCities2 && cityDropBox" class="navbar-dropdown">
            <a v-for="item1 in filteredCities2" :key="item1._id" class="navbar-item mr-2" @click="selectCity2(item1.name)">
                {{ item1.name }}
            </a>
        </div>
    </section>
</template>