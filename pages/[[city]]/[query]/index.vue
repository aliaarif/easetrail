<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
const { onlyNumber } = useValidation()
const universalErrors = ref(true)
const message = ref('')
const showMessage = ref(false)
const showMessageForSuccessClass = ref(false)
const showMessageForErrorClass = ref(true)
const isLoading = ref(false)
const successMessage = (res) => {
  if (res.data.value.message == 'Already Submitted') {
    universalErrors.value = true
  } else {
    universalErrors.value = false
    showMessageForSuccessClass.value = true
    showMessageForErrorClass.value = false
  }
  message.value = res.data.value.message
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000);
}
const errorMessage = (msg) => {
  message.value = msg
  showMessage.value = true
  showMessageForSuccessClass.value = false
  showMessageForErrorClass.value = true
}

definePageMeta({
  middleware: "query",
});


const authStore = useAuthStore();
const authDataStore = useAuthDataStore();

const { title, slug, pageTitle, setPageTitle, pageType, meta, day } = useCommon();
const router = useRouter();
const city = router.currentRoute.value.params.city;
const data = router.currentRoute.value.params.query;
const pageNo = ref(1);
const contents = ref([]);
const metaContent = ref("");
const images = ref([]);

let baseUrl = process.env.SITE_URL_DEV

if (pageType.value == "Subcategories") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(`/api/query?slug=${data}`, {
      method: "get",
    });
  });
  contents.value = res.value;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
  metaContent.value = `${meta.value.page_content}`;
} else if (pageType.value == "Businesses") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(
      `/api/query?city=${title(city)}&subcategory=${data.split("-in-")[0]}`,
      {
        method: "get",
      }
    );
  });
  contents.value = res.value;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
  metaContent.value = `${meta.value.page_content?.replace(new RegExp('City', 'g'), title(city))}`;
} else if (pageType.value == "Business Details") {
  const { data: res } = await useAsyncData("res", () => {
    return $fetch(`/api/query?business_bid=${data.split("-id")[1]}`, {
      method: "get",
    });
  });
  contents.value = res.value;
  images.value = contents?.value.business_images;
  metaContent.value = `${meta.value.page_content}`;
  pageTitle.value = `${meta.value.page_title} in ${title(city)}`;
} else if (pageType.value == "CMS") {
  metaContent.value = `Dummy Contents`;
  pageTitle.value = `Dummy Title`;
}
else if (pageType == "Categories") {
  setPageTitle('fsdfdf')
}



const componentName = ref(null)
const propsObj = ref({
  title: title,
  slug: slug,
  city: city,
  data: data,
  meta: meta.value,
  pageTitle: pageTitle.value,
  pageType: pageType.value,
  day: day.value,
  contents: contents.value,
  images: images.value,
  business_images: contents.value.business_images,
  authStore: authStore,
  authDataStore: authDataStore
})

if (city == 'mobile') {
  componentName.value = 'MobileMenu'
}

if (pageType.value == 'Subcategories' && data != 'profile') {
  componentName.value = 'Subcategories'
}

if (pageType.value == 'Businesses' && data != 'profile') {
  componentName.value = 'BusinessList'
}

if (pageType.value == 'Business Details' && data != 'profile') {
  pageTitle.value = contents.value.business_name
  componentName.value = 'BusinessDetails'
}

if (pageType.value == 'Categories') {
  meta.value.page_title = `fsdfsd`
}


useHead({
  title: `${pageTitle.value ?? 'Easetrail - List your Business Online and Connect with Customers Today!'}`,
  meta: [{ name: "description", content: metaContent.value ?? 'Easetrail, is local search engine, provides Best Deals, Shop Online, Ticket Booking for Flights, Hotels, Movies, Buses and Cabs. You can also Order Food, Book Restaurant Table, View Menu, Book Doctors’ Appointments. Easetrail curates Social content, News, Videos and more from Top Publishers on all Trending Topics.' }],
});

onMounted(() => {
  // alert(meta.value.page_title)
  baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
  isLoading.value = false
});

const { data: categories } = await useAsyncData("categories", () => {
  return $fetch(`/api/categories`, {
    method: "get",
  })
});

const leadsFormData = ref({
  subcategory: data.split("-in-")[0],
  city: city,
  name: authDataStore.authData.name ?? "",
  phone: "",
  email: authDataStore.authData.email ?? "",
  query: data,
  status: "Pending",
});
const leadErrors = ref({
  name: false,
  phone: false
})
const leadErrorsCheck = () => {
  if (!leadErrors.value.name && !leadErrors.value.phone) {
    universalErrors.value = false
  } else {
    universalErrors.value = true
  }
}

const generateLead = async () => {
  leadErrors.value.name = !leadsFormData.value.name ? true : false
  leadErrors.value.phone = !leadsFormData.value.phone ? true : false
  leadErrorsCheck()
  useFetch("/api/save/lead", { method: 'post', body: leadsFormData, watch: false }).then((res) => {
    !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
    if (!universalErrors.value) { } else { universalErrors.value = true }
  })
}


</script>

<template>
  <template v-if="city == 'mobile'">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <ul v-if="data == 'menu'">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            <li><nuxt-link to="/login">Login</nuxt-link></li>
            <li><nuxt-link to="/register">Register</nuxt-link></li>
          </ul>
          <Search v-else />
        </li>
      </ul>
    </aside>
  </template>

  <template v-else-if="pageType == 'Subcategories' && data != 'profile'">
    <!-- <SubcategorySkeleton :count="contents.length" width="100%" height="40px" v-if="isLoading" /> -->
    <!-- <Subcategories :propsObj="propsObj" v-else /> -->

    <section>
      <section class="et-heading mb-5">
        <h2 class="title">{{ meta.page_title ?? 'dummyPageTitle' }} in {{ title(city) }}</h2>
      </section>
      <div class="columns is-multiline is-mobile mb-6">
        <div class="column is-3-tablet is-6-mobile" v-for="s in contents" :key="s._id">
          <a :href="`/${slug(city)}/${s.slug}-in-${slug(city)}`" class="grid-stack box">
            <p><b>{{ s.name }}</b></p>
          </a>
        </div>
      </div>
    </section>

  </template>

  <template v-else-if="pageType == 'Businesses' && data != 'profile'">
    <!-- <BusinessListSkeleton :count="contents.length" width="100%" height="200px" v-if="isLoading" /> -->
    <!-- <BusinessList :propsObj="propsObj" /> -->

    <div>
      <div class="breadcrumb-top mt-4 mb-4">
        <div class="is-left">
          <div class="breadcrumb" aria-label="breadcrumbs">
            <span>
              <span><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></span>
              <span class="sep">»</span>
              <span><a :href="`${baseUrl}/${slug(city)}`">{{
                title(city) }}
                </a></span>
              <span class="sep">»</span>
              <span><a :href="data">{{ meta.page_title ?? 'dummyPageTitle' }} in {{
                title(city) }}</a></span>
              <span class="sep">»</span>
              <span class="is-active ml-2"> {{ contents.length
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <section class="et-heading mt-4 mb-4">
        <h2 class="title">{{ meta.page_title ?? 'dummyPageTitle' }} in {{ title(city) }}</h2>
        <p class="des">
          {{ meta?.page_content?.replace(new RegExp('(City)', 'g'), title(city)) }}
        </p>
      </section>
      <div class="columns">
        <div class="column is-9">
          <!-- 80% width on larger screens -->
          <div class="box media" v-for="(b, index) in contents" :key="b._id">
            <div class="media-left">
              <a :href="`/${slug(city)}/${b?.business_slug}-id${b?.business_bid}`">
                <figure class="image custom-image">
                  <img :src="`/${b?.business_images[0] ?? '../img/brand/unavailable.png'}`" alt="Business Image" />
                </figure>
              </a>
            </div>
            <div class="media-content">
              <h3 class="title is-3">

                <a class="media-content-title" :href="`/${slug(city)}/${b?.business_slug}-id${b?.business_bid}`"
                  :title="`${b.business_name}`">
                  {{ b.business_name }}
                </a>
              </h3>
              <div class="meta-info">
                <div class="location-info mb-2">
                  <i class="fa fa-map-marker mr-2"></i>
                  <span>{{ b.business_address }}</span><span v-if="b.business_address">, </span>
                  <span>{{ b.business_locality }}</span><span v-if="b.business_locality">, </span>
                  <span>{{ b.business_city }}</span><span v-if="b.business_city">, </span>
                  <span>{{ b.business_state }}</span><span v-if="b.business_state">, </span>
                  <span>{{ b.business_pin }}</span>
                </div>
                <div class="contact-info">
                  <span class="media-content-phone" v-if="b.business_phone">
                    <i class="fas fa-phone mr-2"></i>
                    <a :href="'tel: ' + b.business_phone" target="_blank" rel="noopener">{{ b.business_phone }}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <form class="et-form" @submit.prevent="generateLead">
            <h1 class="title is-3 is-size-5">Need Help! Raise Request</h1>
            <button type="link" class="button is-light is-small"
              :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
              v-show="showMessage"> {{ message }}</button>
            <input type="text" class="input is-small" :class="{ 'mt-4 form-field': true, 'dirty': leadErrors.name }"
              v-model="leadsFormData.name" placeholder="Your Name" />

            <input type="text" class="input is-small" :class="{ 'mt-4 form-field': true, 'dirty': leadErrors.phone }"
              v-model="leadsFormData.phone" placeholder="Your Phone Number" @input="onlyIndianMobile" />

            <input type="text" class="input is-small" :class="{ 'mt-4 form-field': true, 'dirty': leadErrors.email }"
              v-model="leadsFormData.email" placeholder="Your Email" />
            <button type="submit" class="button is-primary is-small mt-4">Get Best Deal</button>
          </form>
        </div>
      </div>
    </div>
  </template>

  <template v-else-if="pageType == 'Business Details' && data != 'profile'">
    <BusinessDetailsSkeleton :count="contents.length" width="100%" v-if="isLoading" />
    <BusinessDetails :propsObj="propsObj" v-else />
  </template>

  <!-- <template v-else>
    <Categories />
  </template> -->
</template>

<style>
h1.title.is-1 {
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 0px;
}

nav.breadcrumb {
  margin-top: 30px;
  margin-bottom: 0px;
}

.form-box {
  width: 300px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid#d6d6d6;
  border-radius: 10px;
}

.form-field {
  display: block;
  width: 100%;
  margin: 20px auto;
  padding: 11px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}

.form-button {
  display: block;
  width: 100%;
  margin: 10px auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0479d3;
  color: white;
  font-weight: bold;
}

.recent-post ul {
  width: 300px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
}

.sidebar {
  flex-basis: 20%;
  background-color: #fff;
}

.blog-content {
  flex-basis: 80%;
}

.sidebar {
  padding: 0px;
}

.columns.mt-4 {
  margin: 0px 0px 17px;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
}

.inner {
  margin-top: 17px;
}

.container.mt-2 section {
  margin-left: 20px;
  margin-right: 20px;
}

@media screen and (max-width: 768px) {
  h1.title.is-1 {
    font-size: 26px;
  }

  .blog-content {
    flex-basis: 100%;
  }

  .title.is-4 {
    margin-top: 14px;
  }

  .media-left {
    margin-right: 0px;
  }

  .sidebar {
    flex-basis: 100%;
  }

  .form-box,
  .recent-post ul {
    width: 100%;
  }
}

aside {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
}


.dirty {
  border: 1px solid red;
}

.good {
  border: 1px solid #00b89c;
}

.icon-dirty {
  color: red;
}

.icon-good {
  color: #00b89c;
}

.text-dirty {
  color: red;
}

.text-good {
  color: #00b89c;
}

/** Global CSS**/


@media screen and (max-width: 768px) {
  .site-inner {
    padding-left: 20px;
    padding-right: 20px;
  }

  .inside-container {
    padding: 2rem;
  }
}


/**Global CSS END**/




.ct-thumb-image {
  height: auto;
  width: 320px;
}

@media only screen and (max-width: 600px) {
  .box .media {
    display: inline-block;
  }

  /* Apply align-items and text-align to a specific element or container inside .media */
  .media {
    align-items: inherit;
    text-align: inherit;
  }

  .ct-thumb-image {
    text-align: center;
    display: inline;
  }

  .media-content {
    margin-top: 20px;
  }
}



.media:hover {
  background-color: #e0e0e0;
}

.breadcrumb i.fa.fa-home {
  margin-top: 4px;
}

.breadcrumb span {
  display: inline-block;
  white-space: inherit;
  margin-left: -6px;

}

.title.is-4 {
  line-height: 33px;
  margin-bottom: 11px;
}

.breadcrumb {
  white-space: inherit;
}

.title {
  margin-top: 16px;
  margin-bottom: 20px !important;
}

p.des {
  line-height: 28px;
}

.title.is-3 {
  font-size: 20px;
  line-height: 30px;
}

.et-form {
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 15px;
}

@media screen and (max-width: 480px) {
  .breadcrumb {
    font-size: 12px;
  }
}

@media screen and (max-width: 768px) {
  .site-inner {
    padding-left: 20px;
    padding-right: 20px;
  }

  .inside-container {
    padding: 2rem;
  }
}

.et-heading h1 {
  font-size: 24px !important;
  line-height: 30px;
  margin-top: 20px;
}
</style>
