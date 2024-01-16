<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";

// import { useForm, useField } from 'vee-validate';
// import * as yup from 'yup';

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();
const { title, module, auth, setAuth, dynamicTitle } = useCommon();

import { GoogleSignInButton } from 'vue3-google-signin';


const isSpinner = ref(false)

let user;
// handle success event
const handleLoginSuccess = async (response) => {
  isSpinner.value = true
  const { credential } = response;
  if (credential) {
    user = await $fetch("/api/google-login", {
      method: "POST",
      body: {
        token: credential,
      },
    });
  }
  authStore.setAuthenticated(true);
  authDataStore.setAuthData(user);
  navigateTo("/dashboard");
};

// handle an error event
const handleLoginError = async () => {
  console.error("Login failed");
};

useHead({
  title: `Easetrail Login`,
  meta: [{ name: "Login to Easetrail and list your business online for free.", content: "Welcome back! Please enter your credentials to access your account." }],
});

onMounted(() => {
  let baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
  if (authStore.isAuthenticated) {
    navigateTo("/dashboard");
  }
});

// Validation Schema
// const schema = yup.object({
//   email: yup.string().required().email(),
//   password: yup.string().required(),
// });

// Reactive form state
// const form = ref({
//   email: '',
//   password: ''
// });
// const logo = ref(null);

// VeeValidate setup
// const { handleSubmit, errors } = useForm({
//   validationSchema: schema,
// });

// Handle file upload
// const handleFileUpload = (event) => {
//   logo.value = event.target.files[0];
// };

// Form submission logic
// const onSubmit = async () => {
//   const formData = new FormData();
//   formData.append('email', form.value.email);
//   formData.append('password', form.value.password);
//   formData.append('logo', logo.value);

//   // Here, you can use formData to send data to your server
//   // Example: await axios.post('your-api-endpoint', formData);

//   console.log('Form submitted');
// };


</script>

<template>
  <section class="form">
    <div class="forms-body">
      <div class="container">
        <div class="columns is-centered mt-6">
          <div class="column form-box is-3-tablet is-3-desktop is-3-widescreen box has-text-centered mt-6 mb-4">
            <h1 class="is-size-5 mb-4">Easetrail Login</h1>

            <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 10vh;"
              v-if="isSpinner">
              <div class="content">
                <div class="spinner2 mt-8"></div>
              </div>
            </div>
            <GoogleSignInButton class="mt-1 mb-4" @success="handleLoginSuccess" @error="handleLoginError" v-else>
            </GoogleSignInButton>

            <p class="mt-4"> By signing up, you agree to our <br />
              <a href="https://easetrail.com/terms">Terms of Use </a>
              and
              <a href="https://easetrail.com/privacy">Privacy Policy </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media screen and (max-width: 768px) {

  .columns {
    margin: 0px;
  }

  .form-box {
    padding: 50px;
    margin-right: 20px;
  }
}

.form-box {
  padding: 2.5rem;
  border: 1px solid #dadce0;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}



@media screen and (min-width: 769px) {
  .column.is-3-tablet {
    width: 30%;
  }
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