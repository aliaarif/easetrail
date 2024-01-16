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
  <h3 class="title mt-6 mb-6 skeleton" :style="skeletonStyle" style="width: 450px; height:20px;"></h3>
  <h3 class="skeleton" :style="skeletonStyle" style="width: 450px; height:30px;"></h3>
  <p class="skeleton" :style="skeletonStyle" style="height:50px;"></p>

  <div class="blog-section">
    <div class="blog-content">
        <div v-for="i in count" :key="i">
          <nuxt-link  to="" class="media mt-4 skeleton" :style="skeletonStyle"></nuxt-link>
        </div>
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

/* Include skeleton styles here or in global styles */
</style>
