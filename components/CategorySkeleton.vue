<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '20px'
  },
  count: {
    type: Number,
    default: 1
  },
  margin: {
    type: String,
    default: '10px 0'
  }
});

const skeletonStyle = ref({
  width: props.width,
  height: props.height,
  margin: props.margin
});
</script>


<template>
<div>
  <h3 class="title mt-6 mb-6 skeleton" :style="skeletonStyle" style="width: 600px;"></h3>
  <div class="columns is-multiline is-mobile is-variable is-2-tablet" >
    <div class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen " v-for="i in count" :key="i" >
      <div  class="skeleton grid-item box" :style="skeletonStyle" style=" height: 150px;"></div>
    </div>
  </div>
</div>   
</template>
<style scoped>
.image-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 50%;  /* Makes the skeleton round */
}
</style>
