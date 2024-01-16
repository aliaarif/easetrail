
<script setup>
const props = defineProps({
  propsObj: { type: Object }
})
</script>
<template>
  <div>
    <section class="et-heading mb-5">
      <h2 class="title">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h2>
    </section>
    <div class="columns is-multiline is-mobile mb-6">
      <div class="column is-3-tablet is-6-mobile" v-for="s in props.propsObj.contents" :key="s._id">
        <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${props.propsObj.slug(s?.name)}-in-${props.propsObj.slug(props.propsObj.city)}`"
          class="grid-stack box">
          <!-- <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg" style="width: 100px; height: 100px;" alt="Your Image"> -->
          <p><b>{{ s.name }}</b></p>
        </a>
      </div>
    </div>
  </div>


  <!-- <section>
    <h3 class="title mt-6 mb-6">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h3>
    <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
      <div
        class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen"
        v-for="s in props.propsObj.contents" :key="s._id" >
        <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${props.propsObj.slug(s?.name)}-in-${props.propsObj.slug(props.propsObj.city)}`"
          class="grid-item box" >
          <p> <b>{{ s.name }}</b></p>
        </a>
      </div>
    </div>
  </section> -->
</template>

<style>
.grid-stack {
  align-items: center;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;
  text-decoration: none;
}

.inside-container {
  padding: 3rem 3rem;
  background-color: #fa69001a;
  border-radius: 10px;
  margin: 40px 0px;
}

.stack {
  background-color: transparent;
  border: 2px solid #fa6900;
  border-radius: 50px;
  color: #fa6900;
  text-align: center;
}

.et-heading p {
  margin-bottom: 30px;
}

/*Global Footer*/
.site-footer {
  padding: 3rem 1.5rem 3rem;
  background-color: #fcfcfc;
}

.footer-nav .menu {
  display: flex;
  margin: 20px 0px 20px 0px;
}

.footer-menu.menu li {
  margin: 0px 20px 0px 0px;
}


.site-info {
  text-align: center;
}

.title {
  margin-top: 30px;
}


@media screen and (max-width: 768px) {
  .et-heading h2 {
    font-size: 24px !important;
    line-height: 30px;
    margin-top: 20px;
  }
}

/*Global Footer END*/
</style>