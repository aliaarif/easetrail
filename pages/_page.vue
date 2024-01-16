<script setup>
// const pageSlug = useRouter()


// console.log(pageSlug)

const { data: page } = await useAsyncData("page", () => {
    return $fetch(`/api/pages?slug=${useRouter()}`, {
        method: "get",
    });
});

console.log(page)


</script>
<template>
    <section>
        <h3 class="title mt-6 mb-6"> {{ page.title }}</h3>

        <p>
            {{ page.content }}
        </p>

    </section>
</template>