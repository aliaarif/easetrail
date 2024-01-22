<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const {
  module,
  edit,
  setModule,
  setAction,
  setEdit,
  setDynamicTitle,
  setItem,
  city
} = useCommon();
const router = useRouter()

const showMainMenu = ref(false)
const showLocationMenu = ref(false)

onMounted(() => {
  const burger = document.querySelector('#navbarBurger');
  const menu = document.querySelector('#navbarMenu');

  burger.addEventListener('click', () => {
    // showLocationMenu.value = false
    // showMainMenu.value = true
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });

  const burger2 = document.querySelector('#navbarBurger2');
  const menu2 = document.querySelector('#navbarMenu2');

  burger2.addEventListener('click', () => {
    // showMainMenu.value = false
    // showLocationMenu.value = true
    burger2.classList.toggle('is-active');
    menu2.classList.toggle('is-active');
  });

})

const props = defineProps({
  stateName: String,
  firstParam: Object
})

const menuActive = ref(false)

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
}

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();
const isMobileMenuOpen = ref(false);
const logout = async () => {
  authStore.$resetAuthenticated(false);
  authDataStore.$resetAuthData();
  await navigateTo("/", { replace: true });
};
const setModuleAndAction = (mod, act, edit) => {
  setModule(mod);
  setAction(act);
  setEdit(edit);
  if (mod == 'profile') {
    setItem(authDataStore.authData);
  }
};


</script>
<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation" style="box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1)">

      <div class="navbar-brand">
        <a role="button" class="navbar-item navbar-burger burger is-hidden-tablet" id="navbarBurger"
          style="position:relative; left:-10px;"
          @click="showLocationMenu = !showLocationMenu, showMainMenu = !showMainMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <a @click="navigateTo('/')" href="/" class="navbar-item" style="position:relative; left:-20px;">
          <img src="/img/brand/logo.png" alt="Easetrail" width="112" height="28" />
        </a>


        <a aria-label="menu" aria-expanded="false" class="navbar-item is-hidden-desktop is-hidden-tablet"
          id="navbarBurger2" @click="showLocationMenu = !showLocationMenu, showMainMenu = !showMainMenu">
          {{ city }}
          <span class="icon">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
          </span>
        </a>

      </div>
      <!-- <div class="navbar-menu" id="navbarMenu">
      <div class="navbar-end">
        <a class="navbar-item" href="#">Home</a>
        <a class="navbar-item" href="#">Services</a>
        <a class="navbar-item" href="#">Contact</a>
        <div class="navbar-item is-hidden-touch">
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Select Location">
            </p>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" href="#">Login</a>
            <a class="button is-primary" href="#">Register</a>
          </div>
        </div>
      </div>
    </div> -->
      <div class="navbar-menu" id="navbarMenu">
        <div class="navbar-start" v-if="!authStore.isAuthenticated">
          <nuxt-link to="/login" class="navbar-item">Login</nuxt-link>
        </div>
        <div class="navbar-start" v-else>
          <nuxt-link to="/dashboard" class="navbar-item" @click="
            setModuleAndAction('dashboard', 'grid', false),
            setDynamicTitle('Dashboard')
            ">Dashboard</nuxt-link>
          <nuxt-link to="/dashboard" class="navbar-item" @click="
            setModuleAndAction('profile', 'add-edit', true),
            setDynamicTitle('Profile')
            ">Profile</nuxt-link>
          <nuxt-link to="/dashboard" class="navbar-item" @click="
            setModuleAndAction('businesses', 'add-edit', false),
            setDynamicTitle('Add Business')
            ">My Businesses</nuxt-link>
          <nuxt-link to="javascript:;" class="navbar-item" @click="logout">Logout</nuxt-link>
        </div>
      </div>

      <div class="navbar-menu" id="navbarMenu2">
        <div class="navbar-end">
          <div class="mt-1 navbar-item has-dropdown is-hoverable"
            v-if="props.firstParam.currentRoute.value.name != 'dashboard'">
            <Search />
          </div>
        </div>
      </div>



      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch"
            v-if="props.firstParam.currentRoute.value.name != 'dashboard'">
            <Search />
          </div>
          <div class="navbar-item" v-if="!authStore.isAuthenticated">
            <nuxt-link to="/login" class="navbar-item">Login</nuxt-link>
          </div>
          <div class="navbar-item dropdown is-right is-hoverable" v-else>
            <a class="navbar-link">
              <figure class="image is-40x40">
                <img class="is-rounded" :src="authDataStore.authData.avatar" />
              </figure>
            </a>
            <div class="navbar-dropdown">
              <nuxt-link to="/dashboard" class="navbar-item" @click="
                setModuleAndAction('dashboard', 'grid', false),
                setDynamicTitle('Dashboard')
                ">Dashboard</nuxt-link>
              <nuxt-link to="/dashboard" class="navbar-item" @click="
                setModuleAndAction('profile', 'add-edit', true),
                setDynamicTitle('Profile')
                ">Profile</nuxt-link>
              <nuxt-link to="/dashboard" class="navbar-item" @click="
                setModuleAndAction('businesses', 'add-edit', false),
                setDynamicTitle('Add Business')
                ">My Businesses</nuxt-link>
              <nuxt-link to="javascript:;" class="navbar-item" @click="logout">Logout</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<style>
.navbar.is-fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1024;
}

.navbar {
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.navbar-burger {
  margin-left: 10px;
}

.navbar-brand img {
  max-width: 112px;
  height: auto;
  padding-left: 20px;
}

.navbar-item.is-hidden-desktop.is-hidden-tablet {
  margin-left: auto;
}

.navbar-burger.burger {
  right: 0px !important;
}

/* Initially hide the menu */
#navbarMenu {
  display: none;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
}

/* Show the menu when the burger icon is clicked */
#navbarMenu.is-active {
  display: block;
  transform: translateX(0);
}


/* Initially hide the menu */
#navbarMenu2 {
  display: none;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
}

/* Show the menu when the burger icon is clicked */
#navbarMenu2.is-active {
  display: block;
  transform: translateX(0);
}

@media screen and (max-width: 768px) {
  .navbar-brand img {
    margin-left: -15px;
  }

  .navbar-item .icon:only-child,
  .navbar-link .icon:only-child {
    margin-left: 0.6rem;
  }

}
</style>
