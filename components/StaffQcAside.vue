<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, module, edit } = useCommon()
const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
    if (mod == 'profile') { setItem(authDataStore.authData)}
}
</script>
<template>
    <aside class="menu">
        <ul class="menu-list">
            <li><a v-on:click="setModuleAndAction('dashboard', 'grid', false)" class="is-active">Dashboard</a>
            </li>

            <li class="is-size-6">
                <a @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'businesses' && !edit ? 'is-active' : ''">
                <i class="fa-solid fa-briefcase"></i> Businesses </a>
                <ul>
                    <li class="is-size-6"><a @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'businesses' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>

        </ul>
    </aside>
</template>

