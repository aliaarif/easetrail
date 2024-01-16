
<script setup>
const parentMethod = (val) => {
  console.log('Method in parent component invoked!');
      alert(val)
    }
</script>

<template>
    <div>
      <Child @childEvent="parentMethod"/>
    </div>
</template>
  
