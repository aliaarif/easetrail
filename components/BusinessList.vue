<script setup>
import { useAuthDataStore } from "@/stores/auth-data";
const { title } = useCommon();
const { onlyNumber } = useValidation()
const universalErrors = ref(true)
const authDataStore = useAuthDataStore();
const message = ref('')
const showMessage = ref(false)
const showMessageForSuccessClass = ref(false)
const showMessageForErrorClass = ref(true)


onMounted(() => {
  let baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
})

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
const props = defineProps({
  propsObj: { type: Object }
})
const leadsFormData = ref({
  subcategory: props.propsObj.data.split("-in-")[0],
  city: props.propsObj.city,
  name: authDataStore.authData.name ?? "",
  phone: "",
  email: authDataStore.authData.email ?? "",
  query: props.propsObj.data,
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
  <div>
    <div class="breadcrumb-top mt-4 mb-4">
      <div class="is-left">
        <div class="breadcrumb" aria-label="breadcrumbs">
          <span>
            <span><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></span>
            <span class="sep">»</span>
            <span><a :href="`https://www.easetrail.com/${props.propsObj.slug(props.propsObj.city)}`">{{
              props.propsObj.title(props.propsObj.city) }}
              </a></span>
            <span class="sep">»</span>
            <span><a :href="props.propsObj.data">{{ props.propsObj.meta.page_title }} in {{
              props.propsObj.title(props.propsObj.city) }}</a></span>
            <span class="sep">»</span>
            <span class="is-active ml-2"> {{ props.propsObj.contents.length
            }}</span>
          </span>
        </div>
      </div>
    </div>
    <section class="et-heading mt-4 mb-4">
      <h2 class="title">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h2>
      <p class="des"
        v-html="props.propsObj.meta?.page_content?.replace(new RegExp('cityName', 'g'), props.propsObj.title(props.propsObj.city))">
      </p>
      <!-- <p> {{ props.propsObj.meta?.page_content?.replace(new RegExp('cityName', 'g') }}</p> -->
    </section>
    <div class="columns">
      <div class="column is-9">
        <!-- 80% width on larger screens -->
        <div class="box media" v-for="(b, index) in props.propsObj.contents" :key="index">
          <div class="media-left">
            <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-id${b?._id.substr(16)}`">
              <figure class="image custom-image">
                <img :src="`${b?.business_images[0] ?? '../Image_not_available.png'}`" alt="Business Image" />
              </figure>
            </a>
          </div>
          <div class="media-content">
            <h3 class="title is-3">

              <a class="media-content-title"
                :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-id${b?.business_bid}`"
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
<style scoped>
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