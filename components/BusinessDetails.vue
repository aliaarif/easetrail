<script setup>
// const { day } = useCommon();
const props = defineProps({
  propsObj: {
    type: Object
  }
})
const sliderCurrentIndex = ref(0);
const reduceImageIndex = (index) => {
  if (index > 0) {
    sliderCurrentIndex.value = index - 1;
  }
};
const increaseImageIndex = (index) => {
  if (index < props.propsObj.images.length - 1) {
    sliderCurrentIndex.value = index + 1;
  }
};
let baseUrl = process.env.SITE_URL_SERVER
onMounted(() => {
  baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
})

</script>

<template>
  <div>
    <div class="breadcrumb-top mt-4 mb-4">
      <div class="is-left">
        <div class="breadcrumb" aria-label="breadcrumbs">
          <span>
            <span><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></span>
            <span class="sep">»</span>
            <span>
              <a :href="`${baseUrl}/${props.propsObj.slug(props.propsObj.city)}`">{{
                props.propsObj.title(props.propsObj.city) }}
              </a>
              <!-- <a href="/">{{ props.propsObj.title(props.propsObj.city) }} </a> -->
            </span>
            <span class="sep">»</span>
            <span><a @click="$router.go(-1)"
                :href="`${props.propsObj.slug(props.propsObj.contents?.business_category)}-in-${props.propsObj.slug(props.propsObj.city)}`">
                {{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</a></span>
            <span class="sep">»</span>
            <span class="is-active ml-2">
              {{ props.propsObj.contents?.business_name }}
            </span>
          </span>
        </div>
        <h2 class="et-heading title">{{ props.propsObj.contents?.business_name }}</h2>
      </div>
    </div>
    <div class="columns mt-4" v-if="props.propsObj.images.length > 0">
      <div class="column is-two-fifths" v-if="props.propsObj.images.length > 0">
        <div class="slider">
          <div class="slides">
            <!-- Slide 1 -->
            <div class="card active">
              <img :src="`/${props.propsObj.images[sliderCurrentIndex]}`">
              <div class="download-btn" style="position: relative; top: -50px;">
                <span class="icon">
                  <i class="fas fa-dot-circle mx-1 is-small" v-for="(img, i) in props.propsObj.images" :key="i"
                    @click="sliderCurrentIndex = i"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- Navigation Buttons -->
          <div class="navigation">
            <button @click="reduceImageIndex(sliderCurrentIndex)" class="nav-btn" id="prev"><i
                class="fa fa-chevron-left"></i></button>
            <button @click="increaseImageIndex(sliderCurrentIndex)" class="nav-btn" id="next"><i
                class="fa fa-chevron-right"></i></button>
          </div>
        </div>


        <!-- <div
        class="image-section"
        style="border: 1px solid black; max-height: 350px; max-width: 90%"
      >
        <img
        :src="`${props.propsObj.images[sliderCurrentIndex]}`"
          style="max-height: 300px; min-width: 100%"
          alt="Image"
        />
        <span class="icon" style="position: absolute; top: 260px">
          <a
            class="has-text-white"
            @click="reduceImageIndex(sliderCurrentIndex)"
            href="javascript:;"
          >
            <i class="fas fa-angle-double-left"></i>
          </a>
        </span>
        <span class="icon" style="position: absolute; top: 260px; left: 455px">
          <a
            class="has-text-white"
            @click="increaseImageIndex(sliderCurrentIndex)"
            href="javascript:;"
          >
            <i class="fas fa-angle-double-right"></i>
          </a>
        </span>
      </div> -->
      </div>
      <div class="column">
        <div class="content-section">
          <div class="custom-container">
            <p class="media-for-address-part-1"><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
            <p class="media-for-address-part-2">
              {{ props.propsObj.contents?.business_address }}<span
                v-if="props.propsObj.contents?.business_address">,</span>
              {{ props.propsObj.contents?.business_locality }}<span
                v-if="props.propsObj.contents?.business_locality">,</span>
              {{ props.propsObj.contents?.business_city }}<span v-if="props.propsObj.contents?.business_city">,</span>
              {{ props.propsObj.contents?.business_state }}<span v-if="props.propsObj.contents?.business_state">,</span>
              {{ props.propsObj.contents?.business_pin }}
            </p>
          </div>
          <div class="custom-container">
            <p class="media-for-phone-part-1"><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
            <a class="media-for-phone-part-2" :href="'tel: ' + props.propsObj.contents?.business_phone" target="_blank"
              rel="noopener" v-if="props.propsObj.contents?.business_phone">{{ props.propsObj.contents?.business_phone
              }}</a>
            <span class="media-for-phone-part-2" v-else>N/A</span>
          </div>
          <div class="custom-container">
            <p class="media-for-category-part-1"><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
            <p class="media-for-category-part-2">{{ props.propsObj.contents?.business_category }}</p>
          </div>
        </div>
      </div>
      <Map :lat="props.propsObj.contents?.business_latitude" :long="props.propsObj.contents?.business_longitude"
        class="column is-one-quarter" style="border: 0; height: 290px" allowfullscreen="false" loading="lazy" />
    </div>
    <div class="columns mt-4" v-else>
      <div class="column is-half">
        <div class="content-section">
          <div class="custom-container">
            <p class="media-for-address-part-1"><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
            <p class="media-for-address-part-2">
              {{ props.propsObj.contents?.business_address }}<span
                v-if="props.propsObj.contents?.business_address">,</span>
              {{ props.propsObj.contents?.business_locality }}<span
                v-if="props.propsObj.contents?.business_locality">,</span>
              {{ props.propsObj.contents?.business_city }}<span v-if="props.propsObj.contents?.business_city">,</span>
              {{ props.propsObj.contents?.business_state }}<span v-if="props.propsObj.contents?.business_state">,</span>
              {{ props.propsObj.contents?.business_pin }}
            </p>
          </div>
          <div class="custom-container">
            <p class="media-for-phone-part-1"><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
            <p class="media-for-phone-part-2">
              <a :href="'tel: ' + props.propsObj.contents?.business_phone" target="_blank" rel="noopener"
                v-if="props.propsObj.contents?.business_phone"> {{ props.propsObj.contents?.business_phone }}</a>
              <span v-else>N/A</span>
            </p>
          </div>
          <div class="custom-container">
            <p class="media-for-category-part-1"><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
            <p class="media-for-category-part-2">{{ props.propsObj.contents?.business_category }}</p>
          </div>
        </div>
      </div>
      <Map :lat="props.propsObj.contents?.business_latitude" :long="props.propsObj.contents?.business_longitude"
        class="column is-one-quarter" style="border: 0; width: 400px; height: 320px" allowfullscreen="false"
        loading="lazy" />
    </div>
    <div class="container inner">
      <div class="columns three-layout">
        <div class="column">
          <div class="custom-container">
            <p class="media-for-email-part-1"><i class="fa fa-envelope" aria-hidden="true"></i> Email</p>
            <a class="media-for-email-part-2" :href="'mailto: ' + props.propsObj.contents?.business_email" target="_blank"
              rel="noopener" v-if="props.propsObj.contents?.business_email"> {{ props.propsObj.contents?.business_email
              }}</a>
            <span v-else>N/A</span>
          </div>
          <div class="custom-container">
            <p class="media-for-website-part-1"><i class="fa fa-globe" aria-hidden="true"></i> Website</p>
            <a class="media-for-website-part-2" :href="props.propsObj.contents?.business_website" target="_blank"
              rel="noopener" v-if="props.propsObj.contents?.business_website">Visit Website</a>
            <span class="media-for-website-part-2" v-else>N/A</span>
          </div>

          <div class="custom-container">
            <p class="media-for-social-part-1"><i class="fa fa-share-alt" aria-hidden="true"></i> Social</p>
            <p class="media-for-social-part-2">
              <a :href="props.propsObj.contents?.business_social?.facebook" target="_blank" rel="noopener"
                v-if="props.propsObj.contents?.business_social?.facebook">
                Facebook <i class="fa-brands fa-facebook-f"></i></a>
            </p>
            <p class="media-for-social-part-2">
              <a :href="props.propsObj.contents?.business_social?.instagram" target="_blank" rel="noopener"
                v-if="props.propsObj.contents?.business_social?.instagram">
                Instagram <i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            </p>
            <p class="media-for-social-part-2">
              <a :href="props.propsObj.contents?.business_social?.youtube" target="_blank" rel="noopener"
                v-if="props.propsObj.contents?.business_social?.youtube">
                Youtube <i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="custom-container">
            <p class="media-for-timing"><i class="fa fa-clock" aria-hidden="true"></i> Business Timing</p>
            <p class="media-for-address">
              Monday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.monday?.start == '') || (props.propsObj.contents?.business_timing?.monday?.start == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.monday?.start }} - {{
                props.propsObj.contents?.business_timing?.monday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Monday'"><i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Tuesday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.tuesday?.start == '') || (props.propsObj.contents?.business_timing?.tuesday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.tuesday?.start }} - {{
                props.propsObj.contents?.business_timing?.tuesday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Tuesday'">
                <i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Wednesday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.wednesday?.start == '') || (props.propsObj.contents?.business_timing?.wednesday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.wednesday?.start }} - {{
                props.propsObj.contents?.business_timing?.wednesday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Wednesday'"><i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Thrusday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.thrusday?.start == '') || (props.propsObj.contents?.business_timing?.thrusday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.thrusday?.start }} - {{
                props.propsObj.contents?.business_timing?.thrusday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Thrusday'"><i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Friday:

              <span
                v-if="(props.propsObj.contents?.business_timing?.friday?.start == '') || (props.propsObj.contents?.business_timing?.friday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.friday?.start }} - {{
                props.propsObj.contents?.business_timing?.friday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Friday'"><i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Saturday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.saturday?.start == '') || (props.propsObj.contents?.business_timing?.saturday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.saturday?.start }} - {{
                props.propsObj.contents?.business_timing?.saturday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Saturday'"><i class="fas fa-dot-circle"></i></span>
            </p>
            <p class="media-for-address">
              Sunday:
              <span
                v-if="(props.propsObj.contents?.business_timing?.sunday?.start == '') || (props.propsObj.contents?.business_timing?.sunday?.end == '')">
                Closed </span>
              <span v-else>{{ props.propsObj.contents?.business_timing?.sunday?.start }} - {{
                props.propsObj.contents?.business_timing?.sunday?.end }}</span>
              <span class="icon" v-if="props.propsObj.day == 'Sunday'"><i class="fas fa-dot-circle"></i></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="inner" v-if="props.propsObj.contents?.business_description != '<p><br></p>'">
      <h4 class="title">
        <i class="fa fa-info-circle" aria-hidden="true"></i> About
      </h4>
      <div class="mt-4" v-html="props.propsObj.contents?.business_description"></div>
    </div>

    <div class="inner mt-4 mb-6" v-if="props.propsObj.contents?.business_faqs.length > 0">
      <h4 class="title">
        <i class="fa fa-question-circle" aria-hidden="true"></i> FAQs
      </h4>
      <div v-for="(faq, index) in props.propsObj.contents?.business_faqs" :key="index">
        <div class="box" v-if="faq.q != '' && faq.a != ''">
          <article class="media">
            <figure class="media-left">
              <span class="icon has-text-info">
                <i class="fas fa-question-circle"></i>
              </span>
            </figure>
            <div class="media-content">
              <div class="content">
                <strong>{{ faq.q }}</strong>
                <p>{{ faq.a }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<style scoped>
.box {
  padding: 0px;
  margin-bottom: 20px;
}

.column.is-half .content-section {
  padding-left: 10px;
}



.content {
  line-height: 30px;
}

.columns.three-layout {
  margin-left: 0px;
}

.breadcrumb {
  white-space: inherit;
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

@media screen and (max-width: 480px) {
  .breadcrumb {
    font-size: 12px;
  }
}

@media only screen and (max-width: 767px) {
  .media-content {
    margin-top: 0;
  }

  .media {
    display: flex;
  }
}

@media screen and (max-width: 768px) {
  h2.et-heading.title {
    font-size: 24px !important;
  }
}

@media only screen and (min-width: 768px) {
  .media-content {
    margin-top: -4px;
    margin-left: 4px;
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
  font-size: 24px;
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

.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  border-radius: 10px !important;
}

.slider {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.slider img {
  border-radius: 10px;
}

.slides {
  display: flex;
  transition: transform 0.5s;
}

.card {
  width: 320px;
  padding: 0px 10px 0px 10px;
  background: white;
  text-align: center;
  flex: 0 0 100%;
}

.card h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 400;
  /* Material design font weight */
}

.card p {
  font-size: 16px;
  /* Adjusted font size for material design */
  margin-bottom: 20px;
}


.navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.nav-btn {
  pointer-events: all;
  background: transparent;
  color: #333;
  border: none;
  font-size: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  /* Making the buttons round */
  transition: background 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 8px 13px
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.nav-btn:active {
  transform: scale(0.95);
}


/* Navigation Buttons */
.navigation {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  /* Hide the buttons by default */
  transition: opacity 0.3s;
}

.slider:hover .navigation {
  opacity: 1;
  /* Show the buttons when hovering over the slider */
}

.nav-btn {
  background: #fff;
  border: none;
  font-size: 17px;
  cursor: pointer;
}

.nav-btn i {
  font-size: 17px;
  /* Adjust the size of the Font Awesome icons */
}

.nav-btn:hover {
  background-color: rgb(243 249 255)
}


button#next i.fa.fa-chevron-right:before {
  margin-top: -9px !important;
}

button#prev i.fa.fa-chevron-left:before {
  margin-top: -9px !important;
}


/*Responsive Column*/
.columns {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 5px 0;
}

@media screen and (min-width: 1000px) {
  .column {
    flex: 1 !important;
  }
}


@media screen and (max-width: 600px) {
  .card {
    padding: 0px;
  }
}

.column {
  margin: 2px;
  padding: 10px;
}

.column:first-child {
  margin-left: 0;
}

.column:last-child {
  margin-right: 0;
}

footer {
  padding: 0 15px;
}

@media screen and (max-width: 980px) {
  .columns .column {
    margin-bottom: 5px;
    flex-basis: 40%;
  }

  .columns .column:nth-last-child(2) {
    margin-right: 0;
  }

  .columns .column:last-child {
    flex-basis: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 680px) {
  .columns .column {
    flex-basis: 100%;
    margin: 0 0 5px 0;
  }
}
</style>