<script setup>
const { city, slug, title, pageTitle, metaContent, meta } = useCommon();
const isLoading = ref(false)
onBeforeMount(() => { isLoading.value = true });


const checkCity = ref(false)
$fetch(`/api/cities?name=${city.value}`, { method: 'get' }).then((res) => {
    console.log(res)
    if (res > 0) {
        checkCity.value = true
        city.value = city.value
    }
})

onMounted(() => {
    // alert(meta.value.page_title)
    if (window !== "undefined") {
        category.value = !localStorage.category
            ? localStorage.setItem("category", "hire-on")
            : slug(localStorage.category);
        city.value = (!localStorage.city && checkCity)
            ? localStorage.setItem("city", "gurugram")
            : title(localStorage.city);
    }
    isLoading.value = false
});

const category = ref("hire-on");
const { data: categories } = await useAsyncData("categories", () => {
    return $fetch(`/api/categories`, {
        method: "get",
    })
});

if (city.value.length === 0) {
    city.value = 'delhi'
}



useHead({
    title: `${pageTitle.value ?? 'Easetrail - List your Business Online and Connect with Customers Today!'}`,
    meta: [{ name: "description", content: metaContent.value ?? 'Easetrail, is local search engine, provides Best Deals, Shop Online, Ticket Booking for Flights, Hotels, Movies, Buses and Cabs. You can also Order Food, Book Restaurant Table, View Menu, Book Doctors’ Appointments. Easetrail curates Social content, News, Videos and more from Top Publishers on all Trending Topics.' }],
});
</script>
<template>
    <div>
        <!-- <CategorySkeleton :count="categories.length" width="100%" height="30px" v-if="isLoading" /> -->

        <section class="et-heading mb-5">
            <h1 class="title">Search for Business, Places and Services.</h1>
            <!-- <p class="description">Thoroughly tested and evaluated by our expert editors to help you make a more informed buying decision.</p> -->
        </section>

        <div class="columns is-multiline is-mobile">
            <div class="column is-3-tablet is-6-mobile" v-for="category in categories" :key="category._id">

                <a :href="`/${slug(city)}/${slug(category.slug)}`" class="grid-item box">
                    <img :src="category.image" style="width: 100px; height: 100px" alt="Your Image" />
                    <p>
                        <b>{{ category.name }}</b>
                    </p>
                </a>
            </div>


        </div>

        <section class="inside-container">
            <div class="container">
                <h2 class="title is-3 has-text-black heading-ct">Now Live at</h2>
                <div class="columns is-multiline is-mobile">

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Delhi
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Indore
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Mumbai
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Bangalore
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Chennai
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Kolkata
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Guwahati
                        </div>
                    </div>

                    <div class="column is-3-tablet is-6-mobile">
                        <div class="box stack">
                            Agartala
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
.title {
    color: #363636;
    margin-top: 30px;
    margin-bottom: 0px;
}

@media screen and (max-width: 768px) {
    .title {
        font-size: 26px;
    }
}

.column.is-6-mobile.is-4-tablet.is-4-desktop.is-3-widescreen {
    padding: 10px;
}

.container.mt-2 section {
    margin-left: 20px;
    margin-right: 20px;
}

.heading-ct {
    margin-bottom: 25px;
    margin-top: -10px;
}

.is-peach {
    background-color: rgba(250, 105, 0, .1);
    margin-top: 40px;
    border-radius: 10px;
}

.is-orange {
    border: 2px solid #fa6900;
    background-color: transparent;
    border-radius: 50px;
    color: #fa6900;
    text-align: center;
}

.box.is-orange:hover {
    background-color: orange;
}

.is-orange:hover {
    color: white;
}

.box {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    transition: transform 0.3s ease;
}

.box:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

@media screen and (max-width: 768px) {
    .site-inner {
        padding-left: 20px;
        padding-right: 20px;
    }

    .box.stack {
        padding: 10px;
    }

    .column img {
        width: 50px !important;
        height: 50px !important;
        margin-bottom: 4px;
    }

    .grid-item {
        padding: 10px;
    }

    .inside-container {
        padding: 2rem;
        margin: 40px 0px 0px;
    }

    .et-heading h1 {
        font-size: 24px !important;
        line-height: 30px;
        margin-top: 20px;
    }

    .footer-des {
        text-align: center;
        line-height: 28px;
    }

}
</style>
