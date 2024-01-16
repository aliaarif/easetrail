<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";
import { useDropdownStore } from "@/stores/dropdown";
import { useItemStore } from "@/stores/item";
const dropdownStore = useDropdownStore();
const itemStore = useItemStore();
const authStore = useAuthStore();
const authDataStore = useAuthDataStore();
const { slug, title, module, cities2, edit, item, subcategories, profileTab, setModule, setAction, setEdit, setItem, setMeta, isSpinner2 } = useCommon()
const { onlyAlpha, onlyNumber, onlyAlphaNumber, onlyFacebook, onlyInstagram, onlyYoutube } = useValidation()
const adminModules = ref(['cities', 'categories', 'subcategories', 'businesses', 'users', 'contacts'])
const staffModules = ref(['Total Posted', 'Drafted', 'Approoved', 'Rejected/Update'])
const qcModules = ref(['Drafted', 'Pending', 'Approoved', 'Rejected'])
const userModules = ref(['Total Clicks', 'Total Impressions', 'Total Calls'])
const message = ref('')
const services = ref('')
const isSpinner = ref(false)
const showMessage = ref(false)
const showMessageForSuccessClass = ref(false)
const showMessageForErrorClass = ref(true)
const fileInput = ref(null)
// var formData = new FormData();
// const scats = subcategories.value.map(item => item.name);
const cnt = ref(1)
const showFilesNo = ref('')
const selectedFiles = ref([])
const universalErrors = ref(true)
const { data: states } = await useAsyncData('states',
    () => {
        return $fetch(`/api/states`, {
            method: 'get'
        })
    },
)
const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities?state=${dropdownStore.dropdown.state}`, {
            method: 'get'
        })
    },
)
const localities = ref([])
const localities2 = ref([])
const localities3 = ref([])

const changeCategorySlug = (cat_slug) => {
    useFetch(`/api/save/cahngeSubcategoryField?cat_slug=${cat_slug}`, {
        method: 'get'
    }).then((res) => { })
}

const getCities = (event) => {
    useFetch(`/api/cities?state=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        cities.value = res.data.value
        cities2.value = res.data.value
    })
}



const getLocalities = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.business_categoryslug = slug
    useFetch(`/api/localities?state=${item.value.business_state}&slug=${slug}`, {
        method: 'get'
    }).then((res) => {
        localities.value = res.data.value
    })

}

const getLocalities2 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let state = selectedOption.getAttribute('data-state');
    let city = selectedOption.getAttribute('data-city');

    useFetch(`/api/localities?state=${state}&city=${city}`, {
        method: 'get'
    }).then((res) => {
        localities2.value = res.data.value
    })
}

const getLocalities3 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let state = selectedOption.getAttribute('data-state');
    let city = selectedOption.getAttribute('data-city');

    useFetch(`/api/localities?state=${state}&city=${city}`, {
        method: 'get'
    }).then((res) => {
        localities3.value = res.data.value
    })
}

const { data: categories } = await useAsyncData('categories',
    () => {
        return $fetch(`/api/categories`, {
            method: 'get'
        })
    },
)

const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
    if (mod == 'profile') {
        setItem(authDataStore.authData);
    }
}

const successMessage = (res) => {
    console.log(res.data)
    if (res.data.value.message == 'Already Exist') {
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
const changeSlugAdd = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');

    subCategoryFormData.value.category_slug = slug
}
const changeSlugSave = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.category_slug = slug
}
const changeSlugAdd2 = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    serviceFormData.value.subcategory_slug = slug
}
const changeSlugSave2 = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.subcategory_slug = slug
}
const changeSlugAdd3 = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    keywordFormData.value.subcategory_slug = slug
}
const changeSlugSave3 = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.subcategory_slug = slug
}
const changeSlugAdd4 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    businessFormData.value.business_categoryslug = slug
}
const changeSlugSave4 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.business_categoryslug = slug
}

const changeSlugAdd5 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    businessFormData.value.business_localityslug = slug
}
const changeSlugSave5 = async (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let slug = selectedOption.getAttribute('data-slug');
    item.value.business_localityslug = slug
}


const changeServicesAdd = (event) => {
    businessFormData.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}
if (edit) {
    useFetch(`/api/services?name=${item?.value?.business_category}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}
const changeServicesSave = (event) => {
    item.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}
const changeOwnershipAdd = (event) => { businessFormData.value.business_ownership = event.target.value }
const changeOwnershipSave = (event) => { item.value.business_ownership = event.target.value }
const addBusinessServices1 = (service) => {
    if (!businessFormData.value.business_services.includes(service)) { businessFormData.value.business_services.push(service) }
}
const addBusinessServices2 = (service) => {
    if (!item.value.business_services.includes(service)) { item.value.business_services.push(service) }
}
const removeBusinessServices1 = (service) => { businessFormData.value.business_services.pop(service) }
const removeBusinessServices2 = (service) => { item.value.business_services.pop(service) }
const removeImageFromBusinessAdd = (image) => {
    businessFormData.value.images.pop(image)
    showFilesNo.value = (businessFormData.value.images.length > 0) ? businessFormData.value.images.length + ' Files Selected' : ''
}
const removeImageFromBusinessSave = (indexNo, image, _id) => {
    item.value.business_images.splice(indexNo, 1)
    showFilesNo.value = (item.value.business_images.length > 0) ? item.value.business_images.length + ' Files Selected' : ''
    const imgData = ref({
        _id: _id,
        business_images: image,
    })

    useFetch("/api/save/remove-image", {
        method: 'post',
        body: imgData,
        watch: false
    }).then((res) => {
        console.log(res)
    })
}
// States Modules
const stateFormData = ref({
    name: '',
    status: 'Active'
})
const stateErrors = ref({ name: false })
const stateErrorsCheck = () => {
    if (!stateErrors.value.name) { universalErrors.value = false } else { universalErrors.value = true }
}
const addState = async () => {
    isSpinner.value = true
    stateErrors.value.name = !stateFormData.value.name ? true : false
    stateErrorsCheck()
    useFetch("/api/save/state", { method: 'post', body: stateFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) { stateFormData.value.name = '' } else { universalErrors.value = true }
    })
}
const sErrors = ref({ name: false })
const sErrorsCheck = () => {
    if (!sErrors.value.name) { universalErrors.value = false } else { universalErrors.value = true }
}
const editState = async () => {
    isSpinner.value = true
    sErrors.value.name = !item.value.name ? true : false
    sErrorsCheck()
    useFetch("/api/save/state", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}
// Cities Modules
const cityFormData = ref({
    state: '',
    name: '',
    slug: '',
    status: 'Active'
})
const cityErrors = ref({
    state: false,
    name: false,
    slug: false
})
const cityErrorsCheck = () => {
    if (!cityErrors.value.state && !cityErrors.value.name && !cityErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addCity = async () => {
    isSpinner.value = true
    cityFormData.value.name = dropdownStore.dropdown.city
    cityErrors.value.state = !cityFormData.value.state ? true : false,
        cityErrors.value.name = !cityFormData.value.name ? true : false,
        cityErrors.value.slug = !cityFormData.value.slug ? true : false
    cityErrorsCheck()
    useFetch("/api/save/city", { method: 'post', body: cityFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            cityFormData.value.state = ''
            cityFormData.value.name = ''
            cityFormData.value.slug = ''
            dropdownStore.dropdown.city = ''
        } else {
            universalErrors.value = true
        }
    })
}
const cErrors = ref({
    state: false,
    name: false,
    slug: false
})
const cErrorsCheck = () => {
    if (!cErrors.value.state && !cErrors.value.name && !cErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editCity = async () => {
    isSpinner.value = true
    item.value.name = dropdownStore.dropdown.city
    cErrors.value.state = !item.value.state ? true : false
    cErrors.value.name = !item.value.name ? true : false
    cErrors.value.slug = !item.value.slug ? true : false
    cErrorsCheck()
    useFetch("/api/save/city", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}
// Localities Modules
const localityFormData = ref({
    state: '',
    city: '',
    name: '',
    slug: '',
    status: 'Active'
})
const localityErrors = ref({
    state: false,
    city: false,
    name: false,
    slug: false
})
const localityErrorsCheck = () => {
    if (!localityErrors.value.state && !localityErrors.value.city && !localityErrors.value.name && !localityErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addLocality = async () => {
    isSpinner.value = true
    localityFormData.value.name = dropdownStore.dropdown.locality
    localityErrors.value.state = !localityFormData.value.state ? true : false
    localityErrors.value.city = !localityFormData.value.city ? true : false
    localityErrors.value.name = !localityFormData.value.name ? true : false
    localityErrors.value.slug = !localityFormData.value.slug ? true : false
    localityErrorsCheck()
    useFetch("/api/save/locality", { method: 'post', body: localityFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            localityFormData.value.state = ''
            localityFormData.value.city = ''
            localityFormData.value.name = ''
            localityFormData.value.slug = ''
            dropdownStore.dropdown.locality = ''
        } else {
            universalErrors.value = true
        }
    })
}
const lErrors = ref({
    state: false,
    city: false,
    name: false,
    slug: false
})
const lErrorsCheck = () => {
    if (!lErrors.value.state && !lErrors.value.city && !lErrors.value.name && !lErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editLocality = async () => {
    isSpinner.value = true
    item.value.name = dropdownStore.dropdown.locality
    lErrors.value.state = !item.value.state ? true : false
    lErrors.value.city = !item.value.city ? true : false
    lErrors.value.name = !item.value.name ? true : false
    lErrors.value.slug = !item.value.slug ? true : false
    lErrorsCheck()
    useFetch("/api/save/locality", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        item.value.business_locality = ''
        if (!universalErrors.value) { itemStore.setItem(item) } else { universalErrors.value = true }
        // universalErrors.value = universalErrors.value ? true : false
    })
}
// Categories Modules
const categoryFormData = ref({
    name: '',
    slug: '',
    image: 'https://www.svgrepo.com/show/505187/public-security-bureau.svg',
    page_title: '',
    page_content: '',
    status: 'Active'
})
const categoryErrors = ref({
    name: false,
    slug: false,
    page_title: false,
    page_content: false
})
const categoryErrorsCheck = () => {
    if (!categoryErrors.value.name && !categoryErrors.value.slug && !categoryErrors.value.page_title && !categoryErrors.value.page_content) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addCategory = async () => {
    isSpinner.value = true
    categoryErrors.value.name = !categoryFormData.value.name ? true : false
    categoryErrors.value.slug = !categoryFormData.value.slug ? true : false
    categoryErrors.value.page_title = !categoryFormData.value.page_title ? true : false
    categoryErrors.value.page_content = !categoryFormData.value.page_content ? true : false
    categoryErrorsCheck()
    useFetch("/api/save/category", { method: 'post', body: categoryFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            categoryFormData.value.name = ''
            categoryFormData.value.slug = ''
            categoryFormData.value.page_title = ''
            categoryFormData.value.page_content = ''
        } else {
            universalErrors.value = true
        }
    })
}
const catErrors = ref({
    name: false,
    slug: false,
    page_title: false,
    page_content: false
})
const catErrorsCheck = () => {
    if (!catErrors.value.name && !catErrors.value.slug && !catErrors.value.page_title && !catErrors.value.page_content) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editCategory = async () => {
    isSpinner.value = true
    catErrors.value.name = !item.value.name ? true : false
    catErrors.value.slug = !item.value.slug ? true : false
    catErrors.value.page_title = !item.value.page_title ? true : false
    catErrors.value.page_content = !item.value.page_content ? true : false
    catErrorsCheck()
    useFetch("/api/save/category", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}
// Subcategories Modules
const subCategoryFormData = ref({
    category: '',
    category_slug: '',
    name: '',
    slug: '',
    page_title: '',
    page_content: '',
    status: 'Active'
})
const subCategoryErrors = ref({
    category: false,
    category_slug: false,
    name: false,
    slug: false,
    page_title: false,
    page_content: false
})
const subcategoryErrorsCheck = () => {
    if (!subCategoryErrors.value.category && !subCategoryErrors.value.name && !subCategoryErrors.value.slug && !subCategoryErrors.value.page_title && !subCategoryErrors.value.page_content) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addSubcategory = async () => {
    isSpinner.value = true
    subCategoryErrors.value.category = !subCategoryFormData.value.category ? true : false
    subCategoryErrors.value.name = !subCategoryFormData.value.name ? true : false
    subCategoryErrors.value.slug = !subCategoryFormData.value.slug ? true : false
    subCategoryErrors.value.page_title = !subCategoryFormData.value.page_title ? true : false
    subCategoryErrors.value.page_content = !subCategoryFormData.value.page_content ? true : false
    subcategoryErrorsCheck()
    useFetch("/api/save/subcategory", { method: 'post', body: subCategoryFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            subCategoryFormData.value.category = ''
            subCategoryFormData.value.name = ''
            subCategoryFormData.value.slug = ''
            subCategoryFormData.value.page_title = ''
            subCategoryFormData.value.page_content = ''
        } else {
            universalErrors.value = true
        }
    })
}
const subCatErrors = ref({
    category: false,
    name: false,
    slug: false,
    page_title: false,
    page_content: false
})
const subCatErrorsCheck = () => {
    if (!subCatErrors.value.category && !subCatErrors.value.name && !subCatErrors.value.slug && !subCatErrors.value.page_title && !subCatErrors.value.page_content) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editSubcategory = async () => {
    isSpinner.value = true
    subCatErrors.value.category = !item.value.category ? true : false
    subCatErrors.value.name = !item.value.name ? true : false
    subCatErrors.value.slug = !item.value.slug ? true : false
    subCatErrors.value.page_title = !item.value.page_title ? true : false
    subCatErrors.value.page_content = !item.value.page_content ? true : false
    subCatErrorsCheck()
    useFetch("/api/save/subcategory", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}

// Services Modules
const serviceFormData = ref({
    subcategory: '',
    subcategory_slug: '',
    name: '',
    slug: '',
    // page_title: '',
    // page_content: '',
    status: 'Active'
})
const serviceErrors = ref({
    subcategory: false,
    subcategory_slug: false,
    name: false,
    slug: false,
    // page_title: false,
    // page_content: false
})
const serviceErrorsCheck = () => {
    if (!serviceErrors.value.subcategory && !serviceErrors.value.name && !serviceErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addService = async () => {
    isSpinner.value = true
    serviceErrors.value.subcategory = !serviceFormData.value.subcategory ? true : false
    serviceErrors.value.name = !serviceFormData.value.name ? true : false
    serviceErrors.value.slug = !serviceFormData.value.slug ? true : false
    // serviceErrors.value.page_title = !serviceFormData.value.page_title  ? true : false
    // serviceErrors.value.page_content = !serviceFormData.value.page_content  ? true : false
    serviceErrorsCheck()
    useFetch("/api/save/service", { method: 'post', body: serviceFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            serviceFormData.value.subcategory = ''
            serviceFormData.value.name = ''
            serviceFormData.value.slug = ''
            // serviceFormData.value.page_title = ''
            // serviceFormData.value.page_content = ''
        } else {
            universalErrors.value = true
        }
    })
}
const eServiceErrors = ref({
    subcategory: false,
    subcategory_slug: false,
    name: false,
    slug: false,
    // page_title: false,
    // page_content: false
})
const eServiceErrorsCheck = () => {
    if (!eServiceErrors.value.subcategory && !eServiceErrors.value.name && !eServiceErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editService = async () => {
    isSpinner.value = true
    eServiceErrors.value.subcategory = !item.value.subcategory ? true : false
    eServiceErrors.value.name = !item.value.name ? true : false
    eServiceErrors.value.slug = !item.value.slug ? true : false
    // eServiceErrors.value.page_title = !item.value.page_title  ? true : false
    // eServiceErrors.value.page_content = !item.value.page_content  ? true : false
    eServiceErrorsCheck()
    useFetch("/api/save/service", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}

// Keyword Modules
const keywordFormData = ref({
    subcategory: '',
    subcategory_slug: '',
    name: '',
    slug: '',
    // page_title: '',
    // page_content: '',
    status: 'Active'
})
const keywordErrors = ref({
    subcategory: false,
    subcategory_slug: false,
    name: false,
    slug: false,
    // page_title: false,
    // page_content: false
})
const keywordErrorsCheck = () => {
    if (!keywordErrors.value.subcategory && !keywordErrors.value.name && !keywordErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const addKeyword = async () => {
    isSpinner.value = true
    keywordErrors.value.subcategory = !keywordFormData.value.subcategory ? true : false
    keywordErrors.value.name = !keywordFormData.value.name ? true : false
    keywordErrors.value.slug = !keywordFormData.value.slug ? true : false
    // keywordErrors.value.page_title = !keywordFormData.value.page_title  ? true : false
    // keywordErrors.value.page_content = !keywordFormData.value.page_content  ? true : false
    keywordErrorsCheck()
    useFetch("/api/save/keyword", { method: 'post', body: keywordFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            keywordFormData.value.subcategory = ''
            keywordFormData.value.name = ''
            keywordFormData.value.slug = ''
            // keywordFormData.value.page_title = ''
            // keywordFormData.value.page_content = ''
        } else {
            universalErrors.value = true
        }
    })
}
const kErrors = ref({
    subcategory: false,
    subcategory_slug: false,
    name: false,
    slug: false,
    // page_title: false,
    // page_content: false
})
const kErrorsCheck = () => {
    if (!kErrors.value.subcategory && !kErrors.value.name && !kErrors.value.slug) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}
const editKeyword = async () => {
    isSpinner.value = true
    kErrors.value.subcategory = !item.value.subcategory ? true : false
    kErrors.value.name = !item.value.name ? true : false
    kErrors.value.slug = !item.value.slug ? true : false
    // kErrors.value.page_title = !item.value.page_title  ? true : false
    // kErrors.value.page_content = !item.value.page_content  ? true : false
    kErrorsCheck()
    useFetch("/api/save/keyword", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}

const randomNumber = () => {
    // const unixTimestamp = Math.floor(Date.now() / 1000)
    const mix = Math.floor(Math.random() * 9001000);
    return Math.floor(mix + Math.random() * 90000000);
}


// Businesses Modules
const businessFormData = ref({
    business_bid: randomNumber(),
    business_name: '',
    business_slug: '',
    business_category: '',
    business_categoryslug: '',
    business_phone: '',
    business_email: '',
    business_website: '',
    business_address: '',
    business_state: '',
    business_city: '',
    business_locality: '',
    business_localityslug: '',
    business_pin: '',
    business_latitude: '',
    business_longitude: '',
    business_social: {
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        youtube: 'https://youtube.com/'
    },
    business_timing:
    {
        monday: {
            start: "09:00",
            end: "17:00"
        },

        tuesday: {
            start: "09:00",
            end: "17:00"
        },

        wednesday: {
            start: "09:00",
            end: "17:00"
        },

        thrusday: {
            start: "09:00",
            end: "17:00"
        },

        friday: {
            start: "09:00",
            end: "17:00"
        },

        saturday: {
            start: "",
            end: ""
        },

        sunday: {
            start: "",
            end: ""
        }
    },
    business_services: [],
    business_keywords: [],
    business_description: '',
    business_faqs: [
        {
            q: "",
            a: ""
        },
        {
            q: "",
            a: ""
        },
        {
            q: "",
            a: ""
        }
    ],
    images: [],
    business_images: [],
    page_title: '',
    page_content: '',
    business_ownership: '',
    status: 'Pending',
    created_by: authDataStore.authData.email,
    updated_by: authDataStore.authData.email
})
const businessErrors = ref({
    business_name: false,
    business_slug: false,
    business_category: false,
    business_state: false,
    business_city: false,
})
const businessErrorsCheck = () => {
    if (!businessErrors.value.business_name && !businessErrors.value.business_slug && !businessErrors.value.business_category && !businessErrors.value.business_state && !businessErrors.value.city) { universalErrors.value = false; return false } else { universalErrors.value = true; return true }
}
const addBusiness = () => {

    isSpinner.value = true
    businessErrors.value.business_name = !businessFormData.value.business_name ? true : false
    businessErrors.value.business_slug = !businessFormData.value.business_slug ? true : false
    businessErrors.value.business_category = !businessFormData.value.business_category ? true : false
    businessErrors.value.business_city = !businessFormData.value.business_city ? true : false
    businessErrors.value.business_state = !businessFormData.value.business_state ? true : false
    let errCheck = businessErrorsCheck()
    if (!errCheck) {
        useFetch("/api/save/business", {
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: businessFormData,
            watch: false
        }).then((res) => {
            // console.log(res.data)
            isSpinner.value = false
            !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
            if (!universalErrors.value) {
                showFilesNo.value = ''
                businessFormData.value.business_bid = randomNumber()
                businessFormData.value.business_name = ''
                businessFormData.value.business_slug = ''
                businessFormData.value.business_category = ''
                businessFormData.value.business_phone = ''
                businessFormData.value.business_email = ''
                businessFormData.value.business_website = ''
                businessFormData.value.business_ownership = ''
                businessFormData.value.business_address = ''
                businessFormData.value.business_state = ''
                businessFormData.value.business_city = ''
                businessFormData.value.business_locality = ''
                businessFormData.value.business_pin = ''
                businessFormData.value.business_latitude = ''
                businessFormData.value.business_longitude = ''
                businessFormData.value.business_social.facebook = ''
                businessFormData.value.business_social.instagram = ''
                businessFormData.value.business_social.youtube = ''
                businessFormData.value.business_timing.monday.start = ''
                businessFormData.value.business_timing.monday.end = ''
                businessFormData.value.business_timing.tuesday.start = ''
                businessFormData.value.business_timing.tuesday.end = ''
                businessFormData.value.business_timing.wednesday.start = ''
                businessFormData.value.business_timing.wednesday.end = ''
                businessFormData.value.business_timing.thrusday.start = ''
                businessFormData.value.business_timing.thrusday.end = ''
                businessFormData.value.business_timing.friday.start = ''
                businessFormData.value.business_timing.friday.end = ''
                businessFormData.value.business_timing.saturday.start = ''
                businessFormData.value.business_timing.saturday.end = ''
                businessFormData.value.business_timing.sunday.start = ''
                businessFormData.value.business_timing.sunday.end = ''
                businessFormData.value.business_description = ''
                businessFormData.value.business_faqs = [
                    {
                        q: "",
                        a: ""
                    },
                    {
                        q: "",
                        a: ""
                    },
                    {
                        q: "",
                        a: ""
                    }
                ]
                businessFormData.value.business_images = []
                businessFormData.value.images = []
            } else {
                universalErrors.value = true
            }
        })
    } else {
        errorMessage('Please fill the required fields')
    }
    // selectedFiles.value = []
}
// For Business Edit
const bErrors = ref({
    business_name: false,
    business_slug: false,
    business_category: false,
    business_city: false,
    business_state: false
})
const bErrorsCheck = () => {
    if (!bErrors.value.business_name && !bErrors.value.business_slug && !bErrors.value.business_category && !bErrors.value.business_state && !bErrors.value.city) { universalErrors.value = false } else { universalErrors.value = true }
}
const editBusiness = () => {
    isSpinner.value = true
    bErrors.value.business_name = !item.value.business_name ? true : false
    bErrors.value.business_slug = !item.value.business_slug ? true : false
    bErrors.value.business_category = !item.value.business_category ? true : false
    bErrors.value.business_city = !item.value.business_city ? true : false
    bErrors.value.business_state = !item.value.business_state ? true : false
    bErrorsCheck()
    item.value.updated_by = authDataStore.authData.value?.email
    useFetch("/api/save/business", {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: item.value,
        watch: false
    }).then((res) => {
        console.log(res)
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}
// Users Modules
const userFormData = ref({
    name: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pin: ''
})
const addUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: userFormData
    }).then((res) => { successMessage(res) })
}
const editUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: item.value
    }).then((res) => {
        successMessage(res)
    })
}


const editProfile = async () => {
    useFetch("/api/save/profile", {
        method: 'post',
        body: item.value
    }).then((res) => {
        // console.log(res)
        successMessage(res)
        authDataStore.setAuthData(item.value)

        // setAuth(item.value)
        // localStorage.auth = JSON.stringify(item.value) 
    })
}
// Contacts Modules
const contactFormData = ref({
    name: '',
    status: 'Active'
})
const addContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        successMessage(res)
    })
}
const editContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: item
    }).then((res) => {
        successMessage(res)
    })
}
// Scripts Modules
const scriptFormData = ref({
    name: '',
    type: '',
    body: '',
    status: 'Active'
})
const addScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: scriptFormData
    }).then((res) => {
        successMessage(res)
    })
}
const editScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: item
    }).then((res) => {
        successMessage(res)
    })
}



// Pages Modules
const pageFormData = ref({
    title: '',
    slug: '',
    content: '',
    page_title: '',
    pege_content: '',
    status: 'Active'
})
const pageErrors = ref({ title: false, slug: false, content: false })
const pageErrorsCheck = () => {
    if (!pageErrors.value.title && !pageErrors.value.slug && !pageErrors.value.content) { universalErrors.value = false } else { universalErrors.value = true }
}
const addPage = async () => {
    isSpinner.value = true
    pageErrors.value.title = !pageFormData.value.title ? true : false
    pageErrors.value.slug = !pageFormData.value.slug ? true : false
    pageErrors.value.content = !pageFormData.value.content ? true : false
    pageErrorsCheck()
    useFetch("/api/save/page", { method: 'post', body: pageFormData, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {
            pageFormData.value.title = ''
            pageFormData.value.slug = ''
            pageFormData.value.content = ''
        } else { universalErrors.value = true }
    })
}
const pErrors = ref({ name: false })
const pErrorsCheck = () => {
    if (!pErrors.value.title && !pErrors.value.slug && !pErrors.value.content) { universalErrors.value = false } else { universalErrors.value = true }
}
const editPage = async () => {
    isSpinner.value = true
    pErrors.value.title = !item.value.title ? true : false
    pErrors.value.slug = !item.value.slug ? true : false
    pErrors.value.content = !item.value.content ? true : false
    pErrorsCheck()
    useFetch("/api/save/page", { method: 'post', body: item.value, watch: false }).then((res) => {
        isSpinner.value = false
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        universalErrors.value = universalErrors.value ? true : false
    })
}


const makeSlug = (mod, edit = false) => {
    if (mod == 'cities') {
        cityFormData.value.slug = dropdownStore.dropdown.city
        if (edit) { item.value.slug = slug(dropdownStore.dropdown.city) } else { cityFormData.value.slug = slug(dropdownStore.dropdown.city) }
    }
    if (mod == 'localities') {
        localityFormData.value.slug = dropdownStore.dropdown.locality
        if (edit) { item.value.slug = slug(dropdownStore.dropdown.locality) } else { localityFormData.value.slug = slug(dropdownStore.dropdown.locality) }
    }
    if (mod == 'categories') {
        if (edit) { item.value.slug = slug(item.value.name) } else { categoryFormData.value.slug = slug(categoryFormData.value.name) }
    }
    if (mod == 'subcategories') {
        if (edit) { item.value.slug = slug(item.value.name) } else { subCategoryFormData.value.slug = slug(subCategoryFormData.value.name) }
    }
    if (mod == 'services') {
        if (edit) { item.value.slug = slug(item.value.name) } else { serviceFormData.value.slug = slug(serviceFormData.value.name) }
    }
    if (mod == 'keywords') {
        if (edit) { item.value.slug = slug(item.value.name) } else { keywordFormData.value.slug = slug(keywordFormData.value.name) }
    }
    if (mod == 'businesses') {
        // localityFormData.value.business_locality  = dropdownStore.dropdown.locality
        if (edit) { item.value.business_locality = slug(item.value.business_name) } else { businessFormData.value.business_slug = slug(businessFormData.value.business_name) }
    }
}
const returnVoid = () => { return }

const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]
            resolve(base64String)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const onFileChangeAdd = async (event) => {
    const files = fileInput.value.files
    const promises = []
    for (let i = 0; i < files.length; i++) {
        promises.push(readFileAsBase64(files[i]))
        showFilesNo.value = files.length + ' Files Selected'
        selectedFiles.value.images = files
    }
    Promise.all(promises).then(images => {
        businessFormData.value.images = images
    })
}
const onFileChangeSave = (event) => {
    const files = fileInput.value.files
    const promises = []
    for (let i = 0; i < files.length; i++) {
        promises.push(readFileAsBase64(files[i]))
        showFilesNo.value = files.length + ' Files Selected'
        selectedFiles.value.images = files
    }
    Promise.all(promises).then(images => {
        item.value.images = images
    })
}
const loadCount = (mod) => {
    const { data: res } = useFetch(`/api/count?mod=${mod}&countTerm=${''}`, {
        method: 'get'
    })
    return res.value
}
</script>
<template>
    <!-- module == 'dashboard' -->
    <template v-if="module == 'dashboard'">
        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'Admin'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-4-mobile is-3-tablet is-2-desktop is-2-widescreen" v-for="module in adminModules"
                    :key="module">
                    <nuxt-link :to="'javascript:;'" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <!-- <p><b>{{loadCount(module)}} </b></p> -->
                    </nuxt-link>
                </div>
            </div>
        </template>

        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'QC'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in qcModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>

        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'Staff'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in staffModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>
        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'User'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in userModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>
    </template>
    <!-- All Tables -->
    <template v-else-if="module != 'dashboard' && edit == false">
        <div class="table-container">
            <!-- Admin Tables -->
            <TableForAdmin v-if="authDataStore.authData.role === 'Admin'" />
            <!-- Staff and QC Tables -->
            <TableForStaffAndQC
                v-if="authDataStore.authData.role === 'Staff' || authDataStore.authData.role === 'QC' || authDataStore.authData.role === 'User'" />
        </div>
    </template>
    <!-- For Add And Edit Modules -->
    <template v-else>
        <!-- States Module -->
        <template v-if="module == 'states'">
            <!-- Add State -->
            <section v-if="module == 'states' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{stateFormData}} -->
                        <form @submit.prevent="addState">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': stateErrors.name }"
                                        v-model="stateFormData.name" placeholder="Enter State Name" @input="onlyAlpha">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit State -->
            <section v-if="module == 'states' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editState">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': sErrors.name }"
                                        v-model="item.name" placeholder="Enter State Name" @input="onlyAlpha">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Cities Module -->
        <template v-if="module == 'cities'">
            <!-- Add State -->
            <section v-if="module == 'cities' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{cityFormData}} -->
                        <form @submit.prevent="addCity">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="cityFormData.state" :class="{ 'dirty': cityErrors.state }">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Name</label>
                                <div class="field">
                                    <CityDropdown class="mt-1 navbar-item has-dropdown is-hoverable"
                                        :class="{ 'dirty': cityErrors.name }" :stateName="cityFormData.state"
                                        v-model="cityFormData.name" @childEvent="makeSlug('cities')" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': cityErrors.slug }"
                                        v-model="cityFormData.slug" placeholder="Enter City Slug" @input="onlyAlphaNumber">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit City -->
            <section v-if="module == 'cities' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editCity">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.state" :class="{ 'dirty': cErrors.state }">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Name</label>
                                <div class="control">
                                    <CityDropdown class="mt-1 navbar-item has-dropdown is-hoverable"
                                        :class="{ 'dirty': cErrors.name }" :stateName="item.state" v-model="item.name" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': cErrors.slug }"
                                        v-model="item.slug" placeholder="Enter City Slug" @input="onlyAlphaNumber">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Localities Module -->
        <template v-if="module == 'localities'">
            <!-- Add Locality -->
            <section v-if="module == 'localities' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{localityFormData}} -->
                        <form @submit.prevent="addLocality">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="localityFormData.state" :class="{ 'dirty': localityErrors.state }"
                                        @change="getCities">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="localityFormData.city" :class="{ 'dirty': localityErrors.city }">
                                        <option selected="selected">---Select a city---</option>
                                        <option v-for="(city, index) in cities" :key="index">{{ city.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Locality Name</label>
                                <div class="control">
                                    <LocalityDropdown class="mt-1 navbar-item has-dropdown is-hoverable"
                                        :class="{ 'dirty': localityErrors.name }" :stateName="localityFormData.state"
                                        :cityName="localityFormData.city" v-model="localityFormData.name"
                                        @childEvent="makeSlug('localities')" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Locality Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': localityErrors.slug }"
                                        v-model="localityFormData.slug" placeholder="Enter Locality Slug"
                                        @input="onlyAlphaNumber">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Locality -->
            <section v-if="module == 'localities' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editLocality">
                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.state" :class="{ 'dirty': lErrors.state }" @change="getCities">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">City Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.city" :class="{ 'dirty': lErrors.city }">
                                        <option selected="selected">---Select a city---</option>
                                        <option v-for="(city, index) in cities" :key="index">{{ city.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Locality Name</label>
                                <div class="control">
                                    <LocalityDropdown class="mt-1 navbar-item has-dropdown is-hoverable"
                                        :class="{ 'dirty': lErrors.name }" :stateName="item.state" :cityName="item.city"
                                        v-model="item.name" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Locality Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': lErrors.slug }"
                                        v-model="item.slug" placeholder="Enter Locality Slug" @input="onlyAlphaNumber">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Categories Module -->
        <template v-if="module == 'categories'">
            <!-- Add Category -->
            <section v-if="module == 'categories' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{categoryFormData}} -->
                        <form @submit.prevent="addCategory">
                            <div class="field">
                                <label class="label is-size-7">Category Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': categoryErrors.name }"
                                        v-model="categoryFormData.name" placeholder="Enter Category Name"
                                        @input="makeSlug('categories')">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Category Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': categoryErrors.slug }"
                                        v-model="categoryFormData.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Title</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': categoryErrors.page_title }"
                                        v-model="categoryFormData.page_title" placeholder="Enter Page Title"
                                        @input="onlyAlpha">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Content</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="categoryFormData.page_content" />
                                    </client-only>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Category -->
            <section v-if="module == 'categories' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editCategory">
                            <div class="field">
                                <label class="label is-size-7">Category Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': catErrors.name }"
                                        v-model="item.name" placeholder="Enter Category Name"
                                        @input="makeSlug('categories')">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Category Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': item.slug }"
                                        v-model="item.slug" placeholder="Enter Category Slug" @input="changeCategorySlug">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Title</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': catErrors.page_title }"
                                        v-model="item.page_title" placeholder="Enter Page Title" @input="onlyAlpha">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Content</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="item.page_content" />
                                    </client-only>
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Subcategories Module -->
        <template v-if="module == 'subcategories'">
            <!-- Add Category -->
            <section v-if="module == 'subcategories' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{subCategoryFormData}} -->
                        <form @submit.prevent="addSubcategory">
                            <div class="field">
                                <label class="label is-size-7">Category Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="subCategoryFormData.category"
                                        :class="{ 'dirty': subCategoryErrors.category }" @change="changeSlugAdd">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in categories" :key="index"
                                            :data-slug="category.slug">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': subCategoryErrors.name }"
                                        v-model="subCategoryFormData.name" placeholder="Enter Subcategory Name"
                                        @input="makeSlug('subcategories')">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Subcategory Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': subCategoryErrors.slug }"
                                        v-model="subCategoryFormData.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Title</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': subCategoryErrors.page_title }"
                                        v-model="subCategoryFormData.page_title" placeholder="Enter Page Title"
                                        @input="onlyAlpha">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Content</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="subCategoryFormData.page_content" />
                                    </client-only>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Subcastegory -->
            <section v-if="module == 'subcategories' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editSubcategory">
                            <div class="field">
                                <label class="label is-size-7">Category Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.category" :class="{ 'dirty': subCatErrors.category }"
                                        @change="changeSlugSave">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in categories" :key="index"
                                            :data-slug="category.slug">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': subCatErrors.name }"
                                        v-model="item.name" placeholder="Enter Subcategory Name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Subcategory Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': subCatErrors.slug }"
                                        v-model="item.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Title</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': subCatErrors.page_title }"
                                        v-model="item.page_title" placeholder="Enter Page Title" @input="onlyAlpha">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Content</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="item.page_content" />
                                    </client-only>
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Services Module -->
        <template v-if="module == 'services'">
            <!-- Add Service -->
            <section v-if="module == 'services' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{serviceFormData}}<br/> -->
                        <!-- {{subcategories}} -->
                        <form @submit.prevent="addService">
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="serviceFormData.subcategory"
                                        :class="{ 'dirty': serviceErrors.subcategory }" @change="changeSlugAdd2">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug"
                                            :selected="{ 'selected': serviceFormData.subcategory == category.name }">{{
                                                category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': serviceErrors.name }"
                                        v-model="serviceFormData.name" placeholder="Enter Service Name"
                                        @input="makeSlug('services')">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': serviceErrors.slug }"
                                        v-model="serviceFormData.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Service -->
            <section v-if="module == 'services' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editService">
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.subcategory" :class="{ 'dirty': eServiceErrors.subcategory }"
                                        @change="changeSlugSave2">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug"
                                            :selected="{ 'selected': item.subcategory == category.name }">{{ category.name
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': eServiceErrors.name }"
                                        v-model="item.name" placeholder="Enter Subcategory Name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': eServiceErrors.slug }"
                                        v-model="item.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Keywords Module -->
        <template v-if="module == 'keywords'">
            <!-- Add Keyword -->
            <section v-if="module == 'keywords' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{keywordFormData}} -->
                        <form @submit.prevent="addKeyword">
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="keywordFormData.subcategory"
                                        :class="{ 'dirty': keywordErrors.subcategory }" @change="changeSlugAdd3">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug"
                                            :selected="{ 'selected': keywordFormData.subcategory == category.name }">{{
                                                category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Keyword Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': keywordErrors.name }"
                                        v-model="keywordFormData.name" placeholder="Enter Service Name"
                                        @input="makeSlug('keywords')">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Keyword Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': keywordErrors.slug }"
                                        v-model="keywordFormData.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Keyword -->
            <section v-if="module == 'keywords' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editKeyword">
                            <div class="field">
                                <label class="label is-size-7">Subcategory Name</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.subcategory" :class="{ 'dirty': kErrors.subcategory }"
                                        @change="changeSlugSave3">
                                        <option selected="selected">---Select a state---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug"
                                            :selected="{ 'selected': item.subcategory == category.name }">{{ category.name
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': kErrors.name }"
                                        v-model="item.name" placeholder="Enter Subcategory Name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Service Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': kErrors.slug }"
                                        v-model="item.slug" placeholder="Enter Category Slug">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Businesses Module -->
        <template v-if="module == 'businesses'">
            <!-- Add Business -->
            <section v-if="module == 'businesses' && !item">
                <!-- {{authDataStore.authData.email}} -->
                <!-- {{businessFormData}} -->
                <!-- {{businessFormData.business_categoryslug}} -->
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <form @submit.prevent="addBusiness" v-else>

                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business ID</label>
                                <div class="control">
                                    {{ businessFormData.business_bid }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': businessErrors.business_name }"
                                        v-model="businessFormData.business_name" placeholder="Enter Business Name"
                                        @input="makeSlug('businesses')">
                                </div>
                            </div>
                        </div>
                        <div class="column" v-if="authDataStore.authData.role != 'User'">
                            <div class="field">
                                <label class="label is-size-7">Business Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': businessErrors.business_slug }"
                                        v-model="businessFormData.business_slug" placeholder="Enter Business Slug">
                                </div>
                            </div>
                        </div>
                        <div class="column ">
                            <div class="field">
                                <label class="label is-size-7">Business Category</label>
                                <div class="select is-small is-fullwidth"
                                    :class="{ 'is-danger': businessErrors.business_category }">
                                    <select v-model="businessFormData.business_category"
                                        :class="{ 'dirty': businessErrors.business_category }" @change="changeSlugAdd4">
                                        <option selected="selected">---Select a category---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">

                            <div class="field">
                                <label class="label is-size-7">Business Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="11"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                        v-model="businessFormData.business_phone" placeholder="Enter business_phone">

                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text"
                                        oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                        v-model="businessFormData.business_email" placeholder="Enter business_email">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Website</label>
                                <div class="control">
                                    <input class="input is-small" type="url" v-model="businessFormData.business_website"
                                        placeholder="Enter business_website">
                                </div>
                            </div>
                        </div>
                        <div class="column" v-if="authDataStore.authData.role == 'Admin'">
                            <div class="field">
                                <label class="label is-size-7">Business Ownership</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" value="Verifiefd"
                                            v-bind="businessFormData.business_ownership == 'Verifiefd' ? checked : ''"
                                            v-model="businessFormData.business_ownership" @change="changeOwnershipAdd">
                                        <span class=" is-size-7 "> Verifiefd</span>
                                    </label>
                                    <label class="radio">
                                        <input type="radio" value="Unverifiefd"
                                            v-bind="businessFormData.business_ownership == 'Unverifiefd' ? checked : ''"
                                            v-model="businessFormData.business_ownership" @change="changeOwnershipAdd">
                                        <span class=" is-size-7"> Unverifiefd</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">Address</label>
                        <div class="columns">
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">Business Address</label>
                                    <div class="control">
                                        <input class="input is-small" type="text"
                                            :class="{ 'dirty': businessErrors.business_address }"
                                            v-model="businessFormData.business_address"
                                            placeholder="Enter Business Address">
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">State Name</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="businessFormData.business_state"
                                            :class="{ 'dirty': businessErrors.business_state }" @change="getCities">
                                            <option selected="selected">---Select a state---</option>
                                            <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">City Name</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="businessFormData.business_city"
                                            :class="{ 'dirty': businessErrors.business_city }" @change="getLocalities2">
                                            <option selected="selected">---Select a city---</option>
                                            <option v-for="(city, index) in cities" :key="index"
                                                :data-state="businessFormData.business_state"
                                                :data-city="businessFormData.business_city">{{ city.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">Locality Name</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="businessFormData.business_locality"
                                            :class="{ 'dirty': businessErrors.business_locality }" @change="changeSlugAdd5">
                                            <option selected="selected">---Select a locality---</option>
                                            <option v-for="(locality, index) in localities" :key="index"
                                                :data-slug="locality.slug"
                                                :selected="{ 'selected': businessFormData.business_locality == locality.name }">
                                                {{ locality.name }}</option>
                                        </select>
                                    </div>

                                    <!-- <div class="control">
                                                <LocalityDropdown
                                                class="mt-1 navbar-item has-dropdown is-hoverable"
                                                :stateName="businessFormData.business_state"
                                                :cityName="businessFormData.business_city"
                                                v-model="businessFormData.business_locality"
                                                />
                                            </div> -->
                                </div>
                            </div>
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Business Pin</label>
                                    <div class="control">
                                        <input class="input is-small" type="text"
                                            :class="{ 'dirty': businessErrors.business_pin }"
                                            v-model="businessFormData.business_pin" placeholder="Enter Business Pin">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Latitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="businessFormData.business_latitude" placeholder="Enter business_latitude">
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Longitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="businessFormData.business_longitude"
                                        placeholder="Enter business_longitude">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <Map :lat="businessFormData.business_latitude" :long="businessFormData.business_longitude"
                                style="border:0; height:200px" allowfullscreen=false />
                        </div>
                    </div>


                    <div class="field">
                        <label class="label is-size-7">Business Social</label>
                        <div class="columns">
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Facebook</label>
                                    <div class="control">
                                        <input class="input is-small" type="url"
                                            v-model="businessFormData.business_social.facebook" placeholder="facebook link">
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Instagram</label>
                                    <div class="control">
                                        <input class="input is-small" type="url"
                                            v-model="businessFormData.business_social.instagram"
                                            placeholder="instgram link">
                                    </div>
                                </div>
                            </div>

                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Youtube</label>
                                    <div class="control">
                                        <input class="input is-small" type="url"
                                            v-model="businessFormData.business_social.youtube" placeholder="youtube link">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business timing</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Monday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.monday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.monday.end"
                                                placeholder="Start time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Tuesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.tuesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.tuesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Wednesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.wednesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.wednesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Thrusday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.thrusday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.thrusday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Friday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.friday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.friday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Saturday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.saturday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.saturday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Sunday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.sunday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="businessFormData.business_timing.sunday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field"
                                v-if="authDataStore.authData.role != 'User' && authDataStore.authData.role != 'Staff'">
                                <label class="label is-size-7">Business Description</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="businessFormData.business_description" />
                                    </client-only>
                                </div>
                            </div>

                            <div class="field"
                                v-if="authDataStore.authData.role != 'User' && authDataStore.authData.role != 'Staff'">
                                <label class="label is-size-7">
                                    <div class="icon-text"> Business Faqs </div>
                                </label>
                                <div class="columns">
                                    <div class="column" v-for="faq in businessFormData.business_faqs">
                                        <div class="control mt-1">
                                            <input class="input is-small" type="text" placeholder="Question"
                                                v-model="faq.q">
                                            <textarea class="textarea mt-1 is-small" placeholder="Answer"
                                                v-model="faq.a"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="file is-small has-name is-fullwidth">
                                <label class="file-label">
                                    <input class="file-input is-small" type="file" ref="fileInput" multiple
                                        @change="onFileChangeAdd">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label is-small">
                                            Choose images...
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        {{ showFilesNo }}
                                    </span>
                                </label>
                            </div>
                            <div class="field">
                                <div class="control mt-6">
                                    <span class="tag  is-small" v-for="image in businessFormData.images">
                                        <img :src="`data:image/jpeg;base64,${image}`" width="100" height="50" />
                                        <button class="delete is-small" @click="removeImageFromBusinessAdd(image)"></button>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">Add</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </div>
                    </div>
                </form>
            </section>

            <!-- Edit Business -->
            <section v-if="module == 'businesses' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <form @submit.prevent="editBusiness" v-else>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business ID</label>
                                <div class="control">
                                    {{ item.business_bid }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': bErrors.business_name }"
                                        v-model="item.business_name" placeholder="Enter Business Name"
                                        @input="makeSlug('businesses')">
                                </div>
                            </div>
                        </div>
                        <div class="column" v-if="authDataStore.authData.role != 'User'">
                            <div class="field">
                                <label class="label is-size-7">Business Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': bErrors.business_slug }"
                                        v-model="item.business_slug" placeholder="Enter Business Slug">
                                </div>
                            </div>
                        </div>
                        <div class="column ">
                            <div class="field">
                                <label class="label is-size-7">Business Category</label>
                                <div class="select is-small is-fullwidth"
                                    :class="{ 'is-danger': bErrors.business_category }">
                                    <select v-model="item.business_category" :class="{ 'dirty': bErrors.business_category }"
                                        @change="changeSlugSave4">
                                        <option selected="selected">---Select a category---</option>
                                        <option v-for="(category, index) in subcategories" :key="index"
                                            :data-slug="category.slug">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">

                            <div class="field">
                                <label class="label is-size-7">Business Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="11"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                        v-model="item.business_phone" placeholder="Enter business_phone">

                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text"
                                        oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                        v-model="item.business_email" placeholder="Enter business_email">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Website</label>
                                <div class="control">
                                    <input class="input is-small" type="url" v-model="item.business_website"
                                        placeholder="Enter business_website">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field" v-if="authDataStore.authData.role == 'Admin'">
                                <label class="label is-size-7">Business Ownership</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" value="Verifiefd"
                                            v-bind="item.business_ownership == 'Verifiefd' ? checked : ''"
                                            v-model="item.business_ownership" @change="changeOwnershipAdd">
                                        <span class=" is-size-7 "> Verifiefd</span>
                                    </label>
                                    <label class="radio">
                                        <input type="radio" value="Unverifiefd"
                                            v-bind="item.business_ownership == 'Unverifiefd' ? checked : ''"
                                            v-model="item.business_ownership" @change="changeOwnershipAdd">
                                        <span class=" is-size-7"> Unverifiefd</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">Address</label>
                        <div class="columns">
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">Business Address</label>
                                    <div class="control">
                                        <input class="input is-small" type="text"
                                            :class="{ 'dirty': bErrors.business_address }" v-model="item.business_address"
                                            placeholder="Enter Business Address">
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">State Name</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="item.business_state" :class="{ 'dirty': bErrors.business_state }"
                                            @change="getCities">
                                            <option selected="selected">---Select a state---</option>
                                            <option v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">City Name ({{ item.business_city }})</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="item.business_city" :class="{ 'dirty': bErrors.business_city }"
                                            @change="getLocalities3">
                                            <option selected="selected">{{ item.business_city }}</option>
                                            <option v-for="(city, index) in cities" :key="index"
                                                :data-state="item.business_state" :data-city="item.business_city">{{
                                                    city.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="column ">
                                <div class="field">
                                    <label class="label is-size-7">Locality Name({{ item.business_locality }})</label>
                                    <div class="select is-small is-fullwidth">
                                        <select v-model="item.business_locality"
                                            :class="{ 'dirty': bErrors.business_locality }" @change="changeSlugSave5">
                                            <option selected="selected">---Select a locality---</option>
                                            <option v-for="(locality, index) in localities3" :key="index"
                                                :data-slug="locality.slug"
                                                :selected="{ 'selected': item.business_locality == locality.name }">{{
                                                    locality.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Business Pin</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="item.business_pin"
                                            placeholder="Enter Business Pin">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Latitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="item.business_latitude" placeholder="Enter business_latitude">
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Longitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="item.business_longitude" placeholder="Enter business_longitude">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <Map :lat="item.business_latitude" :long="item.business_longitude"
                                style="border:0; height:200px" allowfullscreen=false />
                        </div>
                    </div>


                    <div class="field">
                        <label class="label is-size-7">Business Social</label>
                        <div class="columns">
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Facebook</label>
                                    <div class="control">
                                        <input class="input is-small" type="url" v-model="item.business_social.facebook"
                                            placeholder="facebook link">
                                    </div>
                                </div>
                            </div>
                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Instagram</label>
                                    <div class="control">
                                        <input class="input is-small" type="url" v-model="item.business_social.instagram"
                                            placeholder="instgram link">
                                    </div>
                                </div>
                            </div>

                            <div class="column ">
                                <div class="control">
                                    <label class="label is-size-7">Youtube</label>
                                    <div class="control">
                                        <input class="input is-small" type="url" v-model="item.business_social.youtube"
                                            placeholder="youtube link">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business timing</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Monday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.monday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.monday.end" placeholder="Start time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Tuesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.tuesday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.tuesday.end" placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Wednesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.wednesday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.wednesday.end" placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Thrusday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.thrusday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.thrusday.end" placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Friday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.friday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.friday.end" placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Saturday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.saturday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.saturday.end" placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Sunday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.sunday.start" placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time"
                                                v-model="item.business_timing.sunday.end" placeholder="End time">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field"
                                v-if="authDataStore.authData.role != 'User' && authDataStore.authData.role != 'Staff'">
                                <label class="label is-size-7">Business Description</label>
                                <div class="control">
                                    <client-only>
                                        <QuillEditor v-model="item.business_description" />
                                    </client-only>
                                </div>
                            </div>

                            <div class="field"
                                v-if="authDataStore.authData.role != 'User' && authDataStore.authData.role != 'Staff'">
                                <label class="label is-size-7">
                                    <div class="icon-text"> Business Faqs </div>
                                </label>
                                <div class="columns">
                                    <div class="column" v-for="faq in item.business_faqs">
                                        <div class="control mt-1">
                                            <input class="input is-small" type="text" placeholder="Question"
                                                v-model="faq.q">
                                            <textarea class="textarea mt-1 is-small" placeholder="Answer"
                                                v-model="faq.a"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="file is-small has-name is-fullwidth">
                                <label class="file-label">
                                    <input class="file-input is-small" type="file" ref="fileInput" multiple
                                        @change="onFileChangeSave">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label is-small">
                                            Choose images...
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        {{ showFilesNo }}
                                    </span>
                                </label>
                            </div>
                            <div class="field">
                                <div class="control mt-6">
                                    <span class="tag  is-small" v-for="(image, index) in item.business_images">
                                        <img :src="`/${image}`" width="100" height="50" />
                                        <button class="delete is-small"
                                            @click="removeImageFromBusinessSave(index, image, item._id)"></button>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">
                                Save <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </div>
                    </div>
                </form>
            </section>

        </template>


        <!-- Users Module -->
        <template v-if="module == 'users'">
            <section v-if="module == 'users' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <form class="box" @submit.prevent="editUser" v-else>
                    <div class="columns">
                        <div class=" column is-half">
                            <div class="field">
                                <label class="label is-small">Name</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Gender</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" v-model="item.gender" @click="item.gender = 'Male'"
                                            value="Male">
                                        Male
                                    </label>
                                    <label class="radio">
                                        <input type="radio" v-model="item.gender" @click="item.gender = 'Female'"
                                            value="Female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Role</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" v-model="item.role" @click="item.role = 'Staff'" value="Staff">
                                        Staff
                                    </label>
                                    <label class="radio">
                                        <input type="radio" v-model="item.role" @click="item.role = 'QC'" value="QC">
                                        QC
                                    </label>
                                    <label class="radio">
                                        <input type="radio" v-model="item.role" @click="item.role = 'User'" value="User">
                                        User
                                    </label>
                                    <label class="radio">
                                        <input type="radio" v-model="item.role" @click="item.role = 'Admin'" value="Admin">
                                        Admin
                                    </label>
                                </div>

                            </div>
                            <div class="field">
                                <label class="label is-small">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Address</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Address" v-model="item.address">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class=" column is-half">
                            <div class="field">
                                <label class="label is-small">Locality</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Locality"
                                        v-model="item.locality">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">City</label>
                                <CitySelect class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch" />
                            </div>
                            <div class="field">
                                <label class="label is-small">State</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="State" v-model="item.state"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">PIN</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="State" v-model="item.pin">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">&nbsp;</label>
                                <button type="submit" class="button is-primary is-small">
                                    Save <span class="spinner" v-if="isSpinner"></span>
                                </button>
                                <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage">
                                    {{ message }}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </template>

        <!-- Leads Module -->
        <template v-if="module == 'leads'">

            <!-- Edit Lead -->
            <section v-if="module == 'leads' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <form @submit.prevent="editLead">

                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" placeholder="Enter Name"
                                        disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.phone" placeholder="Enter Phone"
                                        disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.email" placeholder="Enter email"
                                        disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Subcategory</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.subcategory"
                                        placeholder="Enter Subcategory" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">City</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.city" placeholder="Enter City"
                                        disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Query</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.query" placeholder="Enter Query"
                                        disabled>
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-small">
                                Save <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{
                                message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Contacts Module -->
        <template v-if="module == 'contacts'">


            <!-- Edit Contact -->
            <section v-if="module == 'contacts' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <form class="box" @submit.prevent="editContact">

                            <!-- <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" 
                                        placeholder="Enter Name" disabled>
                                </div>
                            </div> -->


                            <div class="field">
                                <label class="label is-small">Name</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.phone"
                                        placeholder="Enter Phone" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.email"
                                        placeholder="Enter email" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Subject</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.subject"
                                        placeholder="Enter Subject" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Subject</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Subject" v-model="item.subject"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Message</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.message"
                                        placeholder="Enter Message" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Message</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message"
                                        disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- {{item}} -->
                            <div class="field">
                                <label class="label is-small">Status</label>
                                <!-- <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div> -->

                                <div class="select is-primary is-small">

                                    <select v-model="item.status">
                                        <option>Pending</option>
                                        <option>Read</option>
                                        <option>Junk</option>
                                        <option>Awaiting</option>
                                        <option>Replied</option>
                                    </select>
                                </div>

                            </div>


                            <br />

                            <button type="submit" class="button is-primary is-small">
                                Save <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{
                                message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'scripts'">
            <!-- Add Script -->
            <section v-if="module == 'scripts' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <form @submit.prevent="addScript">

                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="scriptFormData.name"
                                        placeholder="Enter Name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Type</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="scriptFormData.type"
                                        placeholder="Enter Type">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Body</label>
                                <div class="control">
                                    <!-- <client-only>
                                       <QuillEditor  v-model="scriptFormData.body"  />
                                    </client-only> -->
                                    <textarea class="textarea full-height" v-model="scriptFormData.body"></textarea>
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-small">
                                Save <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{
                                message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Script -->
            <section v-if="module == 'scripts' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <form @submit.prevent="editScript">

                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" placeholder="Enter Name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Type</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.type" placeholder="Enter Type">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Body</label>
                                <div class="control">
                                    <!-- <client-only>
                                       <QuillEditor  v-model="item.body"  />
                                    </client-only> -->
                                    <textarea class="textarea full-height" v-model="item.body"></textarea>
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-small">
                                Save <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{
                                message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>


        <!-- Pages Module -->
        <template v-if="module == 'pages'">
            <!-- Add Page -->
            <section v-if="module == 'pages' && !item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{pageFormData}} -->
                        <form @submit.prevent="addPage">
                            <div class="field">
                                <label class="label is-size-7">Page Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': stateErrors.name }"
                                        v-model="pageFormData.name" placeholder="Enter Page Name" @input="onlyAlpha">
                                </div>
                            </div>

                        
                            <div class="field">
                                <label class="label is-size-7">Page Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': businessErrors.business_slug }"
                                        v-model="pageFormData.slug" placeholder="Enter Business Slug">
                                </div>
                            </div>
                        


                            <button type="submit" class="button is-primary is-small">
                                Add <span class="spinner" v-if="isSpinner"></span>
                            </button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
            <!-- Edit Page -->
            <section v-if="module == 'pages' && item">
                <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 50vh;"
                    v-if="isSpinner2">
                    <div class="content">
                        <div class="spinner2 mt-8"></div>
                    </div>
                </div>
                <div class="columns" v-else>
                    <div class="column is-half">
                        <!-- {{item}} -->
                        <form @submit.prevent="editPage">
                            <div class="field">
                                <label class="label is-size-7">Page Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" :class="{ 'dirty': sErrors.name }"
                                        v-model="item.title" placeholder="Enter Page Name" @input="onlyAlpha">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Page Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small"
                                        :class="{ 'dirty': businessErrors.business_slug }"
                                        v-model="item.slug" placeholder="Enter Business Slug">
                                </div>
                            </div>
                            <button type="submit" class="button is-small is-primary">Save</button>
                            <button type="link" class="button is-light is-small ml-2"
                                :class="{ 'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors) }"
                                v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'profile'">

            <!-- Edit Script -->
            <section v-if="module == 'profile'">
                <!-- <div class="tabs">
                        <ul>
                            <li :class="profileTab == 'profile' ? 'is-active' : ''" @click="setProfileTab('profile')"><a>Profile</a></li>
                             <li :class="profileTab == 'billing' ? 'is-active' : ''" @click="setProfileTab('billing')"><a>Billing</a></li>
                             <li :class="profileTab == 'security' ? 'is-active' : ''" @click="setProfileTab('security')"><a>Security</a></li>
                             <li :class="profileTab == 'notifications' ? 'is-active' : ''" @click="setProfileTab('notifications')"><a>Notifications</a></li>
                        </ul>
                    </div>  -->
                <!-- {{  item }} -->
                <div class="columns mt-2" v-if="profileTab == 'profile'">
                    <div class="column is-one-fifth">
                        <figure class="image is-128x128">
                            <img class="is-rounded ml-6" :src="authDataStore.authData.avatar">
                        </figure>
                        <span class="button  is-light is-small mt-2 is-size-6">{{ item.name }}</span>
                        <span class="button is-primary is-light is-small mt-2 is-size-6">{{ item.email }}</span>

                    </div>
                    <div class=" column is-four-fifths">
                        <div class="block">
                            Account Details
                            <form class="box" @submit.prevent="editProfile">
                                <div class="columns">
                                    <div class=" column is-half">
                                        <div class="field">
                                            <label class="label is-small">Name</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Name"
                                                    v-model="item.name">
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">Email</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Email"
                                                    v-model="item.email" disabled>
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-envelope"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">Gender</label>
                                            <div class="control">
                                                <label class="radio">
                                                    <input type="radio" v-model="item.gender" @click="item.gender = 'Male'"
                                                        value="Male">
                                                    Male
                                                </label>
                                                <label class="radio">
                                                    <input type="radio" v-model="item.gender"
                                                        @click="item.gender = 'Female'" value="Female">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">Phone</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Phone"
                                                    v-model="item.phone">
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">Address</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Address"
                                                    v-model="item.address">
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" column is-half">
                                        <!-- <div class="field">
                                                <label class="label is-small">Locality</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Locality" v-model="item.locality">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">City</label>
                                                    <CitySelect  class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch"/>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">State</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="State" v-model="item.state" disabled>
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div> -->
                                        <div class="field">
                                            <label class="label is-size-7">State Name</label>
                                            <div class="select is-small is-fullwidth">
                                                <select v-model="item.state" @change="getCities">
                                                    <option selected="selected">---Select a state---</option>
                                                    <option v-for="(state, index) in states" :key="index">{{ state.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-size-7">City Name</label>
                                            <div class="select is-small is-fullwidth">
                                                <select v-model="item.city">
                                                    <option selected="selected">---Select a city---</option>
                                                    <option v-for="(city, index) in cities" :key="index">{{ city.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-size-7">Locality Name</label>
                                            <div class="control">
                                                <LocalityDropdown class="mt-1 navbar-item has-dropdown is-hoverable"
                                                    :stateName="item.state" :cityName="item.city" v-model="item.locality" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">PIN</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="State"
                                                    v-model="item.pin">
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">&nbsp;</label>
                                            <button type="submit" class="button is-primary is-small">
                                                Save <span class="spinner" v-if="isSpinner"></span>
                                            </button>
                                            <button type="link" class="button is-primary is-light is-small ml-2"
                                                v-show="showMessage"> {{ message }}</button>
                                        </div>
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>


                <div class="columns mt-2" v-if="profileTab == 'billing'">
                    <div class=" column is-four-fifths">
                        <div class="block">
                            Billing Details
                        </div>
                    </div>
                </div>

                <div class="columns mt-2" v-if="profileTab == 'security'">
                    <div class=" column is-four-fifths">
                        <div class="block">
                            Security Details
                        </div>
                    </div>
                </div>

                <div class="columns mt-2" v-if="profileTab == 'notifications'">
                    <div class=" column is-four-fifths">
                        <div class="block">
                            Notifications
                        </div>
                    </div>
                </div>

            </section>

        </template>

    </template>
</template>
<style scoped>
#editor {
    height: 150px !important;
}

.ql-container {
    height: 150px !important;
    /* Add other CSS styles as needed */
}

.dirty {
    border: 1px solid #f14668;
}

.good {
    border: 1px solid #00c4a7;
}

.icon-dirty {
    color: #f14668;
    ;
}

.icon-good {
    color: #00c4a7;
}

.text-dirty {
    color: #f14668;
}

.text-good {
    color: #00c4a7;
}

.spinner2 {
    margin-left: 10px;
    border: 1px solid rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    border-top: 1px solid #fff;
    width: 120px;
    height: 120px;
    animation: spin 1s linear infinite;
}

.spinner {
    margin-left: 10px;
    border: 1px solid rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    border-top: 1px solid #fff;
    width: 10px;
    height: 10px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
