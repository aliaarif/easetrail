<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, module, edit, isSpinner2, setIsSpinner } = useCommon()
const setModuleAndAction = (mod, act, edit) => {
    setIsSpinner(true)
    setModule(mod)
    // setIsSpinner(false)
    setAction(act)
    setEdit(edit)
    if (mod == 'profile') { setItem(authDataStore.authData) }
}

</script>
<template>
    <aside class="menu" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
        <ul class="menu-list">
            <li class="is-size-6">
                <a @click="setModuleAndAction('dashboard', 'grid', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'dashboard' && !edit ? 'is-active' : ''">
                    <i class="fa fa-home" aria-hidden="true"></i> Dashboard </a>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('states', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'states' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-city"></i> States </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('states', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'states' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('cities', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'cities' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-briefcase"></i> Cities </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('cities', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'cities' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('localities', 'list', false), setDynamicTitle(title(module), setIsSpinner(true))"
                    :class="module == 'localities' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-briefcase"></i> Localities </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('localities', 'list', false), setDynamicTitle(title(module), setIsSpinner(true))"
                            :class="module == 'localities' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('categories', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'categories' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-city"></i> Categories </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('categories', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'categories' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('subcategories', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'subcategories' && !edit ? 'is-active' : ''">
                    <i class="fa fa-list-alt" aria-hidden="true"></i> Subcategories </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('subcategories', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'subcategories' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a>
                    <i class="fa fa-list-alt" aria-hidden="true"></i> Utilities </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('services', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'services' && !edit ? 'is-active' : ''"> Services </a></li>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('keywords', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'keywords' && !edit ? 'is-active' : ''"> Keywords </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'businesses' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-briefcase"></i> Businesses </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'businesses' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>

            <li class="is-size-6">
                <a @click="setModuleAndAction('users', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'users' && !edit ? 'is-active' : ''">
                    <i class="fa fa-user" aria-hidden="true"></i> Users </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('users', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'users' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('leads', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'leads' && !edit ? 'is-active' : ''">
                    <i class="fa-solid fa-comments-dollar"></i> Leads </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('leads', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'leads' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('contacts', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'contacts' && !edit ? 'is-active' : ''">
                    <i class="fa fa-phone" aria-hidden="true"></i> Contacts </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('contacts', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'contacts' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('scripts', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'scripts' && !edit ? 'is-active' : ''">
                    <i class="fa fa-code" aria-hidden="true"></i> Scripts </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('scripts', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'scripts' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li class="is-size-6">
                <a @click="setModuleAndAction('pages', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                    :class="module == 'pages' && !edit ? 'is-active' : ''">
                    <i class="fa fa-code" aria-hidden="true"></i> Pages </a>
                <ul>
                    <li class="is-size-6"><a
                            @click="setModuleAndAction('pages', 'list', false), setDynamicTitle('All ' + title(module), setIsSpinner(true))"
                            :class="module == 'scripts' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>

            <!-- <li class="is-size-6">
                <a @click="
                  setModuleAndAction('profile', 'add-edit', true),
                    setDynamicTitle('Profile')
                " :class="module == 'profile' && edit ? 'is-active' : ''">
                <i class="fa fa-user" aria-hidden="true"></i> Profile </a>

                
            </li> -->
        </ul>
    </aside>
</template>

<style>
.menu-list a.is-active {
    background-color: hsl(171, 100%, 41%);
}
</style>

