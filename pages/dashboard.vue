<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const authStore = useAuthStore();
const authDataStore = useAuthDataStore();
const {
  dynamicTitle,
  title,
  setItem,
  module,
  setDynamicTitle,
  setModule,
  setAction,
  setEdit,
} = useCommon();

definePageMeta({ layout: 'dashboard' })
useHead({ title: `Easetrail | Dashboard`, meta: [{ name: "description", content: "Easetrail Dashboard Page" }] })
onMounted(() => { !authStore.isAuthenticated ? navigateTo("/login") : authDataStore.setAuthData(authDataStore.authData ?? {}) });

// const qcModules = ref(["QC Done", "Approoved", "Pending", "Rejected"]);
// const staffModules = ref(["Total Posted1", "Approoved", "Pending", "Rejected"]);

const setModuleAndAction = (mod, act, edit) => {
  setModule(mod);
  setAction(act);
  setEdit(edit);
};
</script>
  
<template>
  <section>
    <div class="columns mt-1">
      <!-- {{authDataStore.authData.role}} -->
      <div class="column" :class="{ 'is-one-fifth is-one-fifth-custom': authDataStore.authData.role == 'Admin' }"
        v-if="authDataStore.authData.role == 'Admin'">
        <AdminAside v-if="authDataStore.authData.role == 'Admin'" />
        <!-- <StaffQcAside
          v-if="authDataStore.authData.role === 'Staff' || authDataStore.authData.role === 'QC' || authDataStore.authData.role === 'User'"
          /> -->
      </div>
      <div class="column"
        :class="{ 'is-four-fifths is-four-fifth-custom': authDataStore.authData.role == 'Admin', 'is-full': authDataStore.authData.role != 'Admin' }">
        <div class="block">
          <div class="tag is-primary is-medium ml-1 is-pulled-left" v-if="module != 'dashboard'">
            {{ dynamicTitle }}
          </div>

          <div class="button tag is-primary is-medium ml-1 is-pulled-right" v-if="module != 'dashboard' &&
            module != 'contacts' &&
            module != 'leads' &&
            module != 'users' &&
            module != 'profile'
            " @click="
    setModuleAndAction(module, 'add-edit', true),
    setDynamicTitle('Add ' + title(module)),
    setItem('')
    ">
            Add New
          </div>
        </div>
        <br />
        <Default />
      </div>
    </div>
  </section>
</template>

<style scoped>
.is-one-fifth-custom {
  width: 15% !important
}

.is-four-fifth-custom {
  width: 85% !important
}
</style>
