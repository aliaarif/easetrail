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
  <h3 class="title mt-6 skeleton" :style="skeletonStyle" style="width: 700px; height:20px;"></h3>
  <h3 class="mt-6 skeleton" :style="skeletonStyle" style="width: 450px; height:40px;"></h3>
  <div class="skeleton" :style="skeletonStyle" style="width:100%; height:300px;"></div>
  <div class="skeleton" :style="skeletonStyle" style="width:100%; height:200px;"></div>
  <div class="skeleton" :style="skeletonStyle" style="width:100%; height:100px;"></div>
</div>   
</template>
<style scoped>
.image-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 50%;  /* Makes the skeleton round */
}

/* Include skeleton styles here or in global styles */
</style>
