<script setup>

const { data: page } = await useAsyncData("page", () => {
  return $fetch(`/api/pages?slug=privacy`, {
    method: "get",
  });
});



</script>
<template>
  <section>
    <h3 class="title mt-6 mb-6"> {{ page.title }}</h3>

    <p>
      {{ page.content }}
    </p>

  </section>
</template>