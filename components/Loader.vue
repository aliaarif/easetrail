<script setup>
const loading = () => {
    return $nuxt.loading.isActive;
}
</script>
<template>
  <div v-if="loading" class="loader">
    <!-- Your loading indicator (e.g., spinner, loading animation, etc.) -->
    Loading...
  </div>
</template>
<style scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    color: white;
  }
  </style>
  