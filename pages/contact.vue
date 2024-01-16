<script setup>
useHead({
    title: 'Easetrail | Contact Us',
    meta: [
        { name: 'description', content: 'Contact Us' }
    ]
})
const universalErrors = ref(true)
const { onlyNumber, onlyEmail } = useValidation()
const message = ref('')
const showMessage = ref(false)
const showMessageForSuccessClass = ref(false)
const showMessageForErrorClass = ref(true)
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


const msgFormData = ref({
    "name": "",
    "phone": "",
    "email": "",
    "subject": "",
    "message": "",
    "status": "Pending"
});
const msgErrors = ref({
    "name": false,
    "phone": false,
    "email": false,
    "subject": false,
    "message": false,
})
const msgErrorsCheck = () => {
    if (!msgErrors.value.name && !msgErrors.value.phone && !msgErrors.value.email && !msgErrors.value.subject && !msgErrors.value.message ) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}

const sendMessage = async () => {
    msgErrors.value.name = !msgFormData.value.name ? true : false
    msgErrors.value.phone = !msgFormData.value.phone  ? true : false
    msgErrors.value.email = !msgFormData.value.email  ? true : false
    msgErrors.value.subject = !msgFormData.value.subject  ? true : false
    msgErrors.value.message = !msgFormData.value.message  ? true : false
    msgErrorsCheck()
    useFetch("/api/save/contact", { method: 'post', body: msgFormData, watch:false}).then((res) => {
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) { 
            msgFormData.value.name  = ''
            msgFormData.value.phone  = ''
            msgFormData.value.email  = ''
            msgFormData.value.subject  = ''
            msgFormData.value.message  = ''
         } else { universalErrors.value  = true }
    })
}


</script>
<template>
    <section>
        <h3 class="title mt-6 mb-6">Contact Us</h3>
        <p>
            Please let us know if you have any feedback, suggestions, or comments on Easetrail. We'd love to hear your thoughts!
        </p>
        <!-- {{msgFormData}} -->
        <form @submit.prevent="sendMessage" class="mt-6">
        
            <div class="field is-horizontal">
                <div class="field-label is-small mt-4">
                    <label class="label">Name</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left has-icons-right">
                            <input type="text" :class="{'mt-4 input is-small form-field': true, 'dirty': msgErrors.name}" placeholder="Name" v-model="msgFormData.name" >
                            <span class="icon is-small is-left mt-4">
                                <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right mt-4">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded has-icons-left has-icons-right">
                            <input type="email" :class="{'mt-4 input is-small form-field': true, 'dirty': msgErrors.email}" placeholder="Email" v-model="msgFormData.email"  >
                            <span class="icon is-small is-left mt-4">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right mt-4">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-small mt-4">
                    <label class="label">Phone</label>
                </div>
                <div class="field-body">
                    <div class="field is-expanded">
                        <div class="field has-addons">
                            <p class="control">
                                <a class="button is-static is-small mt-4">
                                    +91
                                </a>
                            </p>
                            <p class="control is-expanded">
                                <input type="text" :class="{'mt-4 input is-small form-field': true, 'dirty': msgErrors.phone}" placeholder="Phone" v-model="msgFormData.phone" @input="onlyNumber" >
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-small mt-4">
                    <label class="label">Subhect</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="msgFormData.subject"  :class="{'mt-4 input is-small form-field': true, 'dirty': msgErrors.subject}"  >
                                    <option selected>Feedback & Enquiries</option>
                                    <option>Patnership</option>
                                    <option>Business Listing Related</option>
                                    <option>Others</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="field is-horizontal">
                <div class="field-label is-small mt-4">
                    <label class="label">Message</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" placeholder="Please fill out the above fields with your information and message. We will get back to you as soon as possible. Thank you!"
                                v-model="msgFormData.message" :class="{'mt-4 input is-small form-field': true, 'dirty': msgErrors.message}" ></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal mb-6">
                <div class="field-label">
                    <!-- Left empty for spacing -->
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <button type="submit" class="button is-small is-primary">
                                Send message
                            </button> 
                            <button type="link" class="button is-light is-small" :class="{'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors)}" v-show="showMessage"> {{ message }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>
<style scoped>
.dirty{
    border: 1px solid #f14668;
}
.good{
    border: 1px solid #00c4a7;
}
.icon-dirty{
    color: #f14668;;
}

.icon-good{
    color: #00c4a7;
}
.text-dirty{
    color: #f14668;
}
.text-good{
    color: #00c4a7;
}
</style>
