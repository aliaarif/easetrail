<script setup>
const { data: pages } = await useAsyncData('pages',
  () => {
    return $fetch(`/api/pages`, {
      method: 'get'
    })
  },
)
onMounted(() => {
  let baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
})

const props = defineProps({
  firstParam: Object
})

// const path = useRouter().currentRoute.value
// const firstParam = useRouter().currentRoute.value.params.city
// console.log(firstParam)
</script>
<template>
  <footer class="site-footer" v-if="props.firstParam.currentRoute.value.name != 'login'">
    <div class="container">
      <div class="footer-des">
        Welcome to Easetrail, your go-to destination for all your daily needs! Whether you're searching for the daily need
        services, we've got you covered with a vast array of services from beauty and wellness to home repairs, travel
        &amp; accommodations, educational institutions, and beyond, you'll find a wide range of services to cater to your
        specific requirements. Each service category comes with detailed listings, providing you with all the essential
        information you need. Discover contact details, operating hours, service descriptions, reviews, and more, all at
        your fingertips.
      </div>

      <div class="footer-nav">
        <ul class="footer-menu menu">
          <li class="menu-item" v-for="pageName in pages" :key="pageName.slug">
            <nuxt-link :to='pageName.slug' :aria-label="pageName.title">{{ pageName.title
            }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="site-info">
        <span>©2023 Easetrail All Rights Reserved</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .footer-nav .menu {
    justify-content: center;
    text-align: center;
  }
}

.footer-des {
  text-align: center;
  line-height: 28px;
}

@media screen and (max-width: 330px) {

  .footer-nav .menu,
  .site-info {
    font-size: 13px;
  }

  .footer-des {
    font-size: 14px;
  }
}
</style>