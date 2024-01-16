<script setup>
  const emit = defineEmits()
  const invokeParentMethod = (event) => {
      emit('childEvent', event.target.value);
}
</script>
<template>
  <input @input="invokeParentMethod">
    <button @click="invokeParentMethod">Click Me</button>
</template>
  

  