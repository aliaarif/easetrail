<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const {
  setAuth,
  auth,
  module,
  edit,
  setModule,
  setAction,
  setEdit,
  setDynamicTitle,
  item,
  setItem,
} = useCommon();

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
  <section>
    <nav class="navbar" style="box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1)">
      <div class="navbar-brand">
        <nuxt-link
          to="/mobile/menu"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          style="position: relative; right: 170px"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </nuxt-link>

        <nuxt-link @click="navigateTo('/')" to="/" class="navbar-item">
          <img
            src="https://www.licious.in/image/rebranding/svg/licious-logo.svg"
            alt="Logo"
            width="112"
            height="28"
          />
        </nuxt-link>

        <div class="navbar-item">
          <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
        </div>
        <div class="navbar-item">
          <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>
        </div>

        <nuxt-link
          to="/mobile/search"
          aria-label="menu"
          aria-expanded="false"
          class="navbar-item is-hidden-desktop is-hidden-tablet"
        >
          <span class="icon">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
          </span>
        </nuxt-link>
      </div>

      <!-- <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item dropdown is-right is-hoverable">
            <a class="navbar-link">
              <figure class="image is-40x40">
                <img class="is-rounded" :src="auth?.avatar ?? item?.avatar" />
              </figure>
            </a>
            <div class="navbar-dropdown">
              <nuxt-link
                to="javascript:;"
                class="navbar-item"
                @click="
                  setModuleAndAction('profile', 'add-edit', true),
                    setDynamicTitle('Profile')
                "
                :class="module == 'dashboard' && !edit ? 'is-active' : ''"
                >Profile</nuxt-link
              >
              <nuxt-link to="javascript:;" class="navbar-item" @click="logout"
                >Logout</nuxt-link
              >
            </div>
          </div>
        </div>
      </div> -->

      <div class="navbar-menu" id="navbarMenu">
        <div class="navbar-end">
          <!-- <button
            v-if="$route.name != 'index'"
            class="mt-2 navbar-item button is-black mr-1"
            @click="$router.go(-1)"
          >
            Back
          </button> -->
          <div class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch">
            <Search />
          </div>
          <div class="navbar-item" v-if="!authStore.isAuthenticated">
            <nuxt-link to="/login" class="navbar-item">Login</nuxt-link>
          </div>
          <div class="navbar-item dropdown is-right is-hoverable" v-else>
            <!-- <div class="navbar-item">
              <nuxt-link to="/dashboard" class="navbar-item">Dashboard</nuxt-link>
            </div> -->

            <a class="navbar-link">
              <figure class="image is-40x40">
                <img class="is-rounded" :src="authDataStore.authData.avatar" />
              </figure>
            </a>
            <div class="navbar-dropdown">
              <nuxt-link
                to="/dashboard"
                class="navbar-item"
                @click="
                  setModuleAndAction('dashboard', 'grid', false),
                    setDynamicTitle('Dashboard')
                "
                :class="module == 'dashboard' && !edit ? 'is-active' : ''"
                >Dashboard</nuxt-link
              >
              <nuxt-link
                to="/dashboard"
                class="navbar-item"
                @click="
                  setModuleAndAction('profile', 'add-edit', true),
                    setDynamicTitle('Profile')
                "
                :class="module == 'dashboard' && !edit ? 'is-active' : ''"
                >Profile</nuxt-link
              >
              <nuxt-link
                to="/dashboard"
                class="navbar-item"
                @click="
                  setModuleAndAction('businesses', 'add-edit', false),
                    setDynamicTitle('Add Business')
                "
                :class="module == 'dashboard' && !edit ? 'is-active' : ''"
                >My Businesses</nuxt-link
              >
              <nuxt-link to="javascript:;" class="navbar-item" @click="logout"
                >Logout</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>
