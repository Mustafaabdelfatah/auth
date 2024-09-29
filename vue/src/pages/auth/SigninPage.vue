<template >
  <div >
    <v-card class="main">
      <img width="226px"
      height="56px" :src="'/images/irrigation.png'" alt="">
      <v-card-title class="justify-right display-1 mb-2">مرحبًا! 👋</v-card-title>
      <v-card-subtitle style="color: black;">قم بتسجيل الدخول ، سيمكنك من الحصول على جميع الميزات.</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
          style="height: 48px;"

            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            placeholder="ادخل الايميل"
            name="email"
            outlined
            autocomplete="off"
            @keyup.enter="submit"
            @change="resetErrors"
          >
          <template v-slot:prepend-inner>
            <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6H19C19.3862 6 19.7213 6.21897 19.8879 6.53954L12.5547 11.4283C12.2188 11.6523 11.7812 11.6523 11.4453 11.4283L4.11209 6.53953C4.27868 6.21896 4.61377 6 5 6ZM4 8.8685V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V8.86852L13.6641 13.0924C12.6564 13.7642 11.3436 13.7642 10.3359 13.0924L4 8.8685ZM2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7Z" fill="#6F767E"/>
</svg>
    </template>
        </v-text-field>

          <v-text-field
    style="height: 48px; margin-top: 40px;"
    v-model="password"
    autocomplete="off"
    :rules="[rules.required]"
    :type="showPassword ? 'text' : 'password'"
    :error="error"
    :error-messages="errorMessages"
    placeholder="ادخل كلمة السر"

    name="password"
    outlined
    @change="resetErrors"
    @keyup.enter="submit"
    @click:append="showPassword = !showPassword"
>
    <template v-slot:prepend-inner>
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 10px;">
            <path d="M13 15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V15.7324Z" fill="#6F767E"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 8V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V8C18.6569 8 20 9.34315 20 11V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V11C4 9.34315 5.34315 8 7 8ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V8H9V7ZM6 11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V11Z" fill="#6F767E"/>
        </svg>
    </template>
</v-text-field>

          <div style="height: 22px; margin-top: 12px;margin-bottom: 18px;">
            <!-- <p style="color: #005A4E;font-weight: 400;font-size: 14px;">هل نسيت كلمة السر؟</p> -->
          </div>
          <v-btn
          style="border-radius: 12px;height: 48px;font-family: Neo Sans Arabic;padding: 12px 20px;"
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="primary"
            @click="submit"
            >{{ $t("login.button") }}</v-btn
          >

          <!--          <div class="caption font-weight-bold text-uppercase my-3">{{ $t('login.orsign') }}</div>-->

          <!-- external providers list -->
          <!--          <v-btn-->
          <!--            v-for="provider in providers"-->
          <!--            :key="provider.id"-->
          <!--            :loading="provider.isLoading"-->
          <!--            :disabled="isSignInDisabled"-->
          <!--            class="mb-2 primary lighten-2 primary&#45;&#45;text text&#45;&#45;darken-3"-->
          <!--            block-->
          <!--            x-large-->
          <!--            to="/"-->
          <!--          >-->
          <!--            <v-icon small left>mdi-{{ provider.id }}</v-icon>-->
          <!--            {{ provider.label }}-->
          <!--          </v-btn>-->

          <!--          <div v-if="errorProvider" class="error&#45;&#45;text">{{ errorProviderMessages }}</div>-->

          <!--          <div class="mt-5">-->
          <!--            <router-link to="/auth/forgot-password">-->
          <!--              {{ $t('login.forgot') }}-->
          <!--            </router-link>-->
          <!--          </div>-->
        </v-form>
      </v-card-text>
    </v-card>

    <!--    <div class="text-center mt-6">-->
    <!--      {{ $t('login.noaccount') }}-->
    <!--      <router-link to="/auth/signup" class="font-weight-bold">-->
    <!--        {{ $t('login.create') }}-->
    <!--      </router-link>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from "vue";
import { makeToast } from "@/helpers";
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
export default {
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      email: "",
      password: "",

      // form error
      error: false,
      errorMessages: "",

      errorProvider: false,
      errorProviderMessages: "",

      // show password field
      showPassword: false,

      providers: [
        {
          id: "google",
          label: "Google",
          isLoading: false
        },
        {
          id: "facebook",
          label: "Facebook",
          isLoading: false
        }
      ],

      // input rules
      rules: {
        required: value => (value && Boolean(value)) || "Required"
      }
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.isSignInDisabled = true;
        this.signIn(this.email, this.password);
      }
    },
    signIn(email, password) {
      const data = {
        email,
        password
      };

      this.login(data)
        .then(() => {
          this.isLoading = false;
          this.isSignInDisabled = false;
          //
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.isSignInDisabled = false;
          if (error?.response?.status == 422) {
            let { errors } = error?.response?.data;
            // console.log(errors);
            this.errorMessages = errors;
          }
        });
    },
    signInProvider(provider) {},
    resetErrors() {
      this.error = false;
      this.errorMessages = "";

      this.errorProvider = false;
      this.errorProviderMessages = "";
    }
  }
};
</script>
<style>

.main{

  border: none !important;
box-shadow: none !important;
}
*{
margin: 0;
padding:0;

}
@media screen and (max-width: 540px) {
  .main{
  margin-left: 0 !important;
  border: none !important;
box-shadow: none !important;
height: auto !important;
background-color: #fff !important;
width: 90% !important;
margin: auto !important;
}
*{
margin: 0;
padding:0;

}
}
@media screen and (max-width: 912px) {

.main{
  width: 100% !important;
  height: 100% !important;
  margin-left: 0 !important;
  margin: auto !important;

}



}
@media screen and (max-width: 820px) {

.main{
  width: 90% !important;
  height: 100% !important;
  margin-left: 100px !important;
}
}
</style>
