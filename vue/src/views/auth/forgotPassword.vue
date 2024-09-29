<template>
  <AuthLayout>
    <v-row no-gutters class="bg-white h-screen h-120vh">
      <v-col
        cols="12"
        md="6"
        class="pa-0 ma-0 h-50 h-md-100 position-relative"
        style="overflow: hidden"
      >
        <AuthSide
          :img="authImage"
          title="PAGES.FORGET_PASSWORD.SIDE_HEAD"
          desc="PAGES.FORGET_PASSWORD.SIDE_DESC"
        />
      </v-col>
      <v-col cols="12" md="6" class="h-50 h-md-100">
        <div
          class="w-100 min-h-100 d-flex align-center flex-column pa-8 pa-md-16 justify-center auth-form"
        >
          <v-progress-linear
            :active="authStore.isLoading"
            color="primary"
            indeterminate
            absolute
            bottom
          />

          <authHeading
            title="PAGES.FORGET_PASSWORD.TITLE"
            description="PAGES.FORGET_PASSWORD.DESCRIPTION"
          />

          <div class="w-100" v-if="isReset">
            <GenericForm :schema="schema" @submit="login">
              <template #submit>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  elevation="0"
                  min-height="50"
                  class="py-5 font-weight-bold mt-7 btn-primary"
                >
                  {{ t('BUTTONS.SEND_CODE') }}
                </v-btn>
              </template>
            </GenericForm>
          </div>
          <div v-else class="w-100">
            <GenericForm :schema="OTPSchema" @submit="login">
              <template #submit>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  elevation="0"
                  min-height="50"
                  class="py-5 font-weight-bold mt-7 btn-primary"
                >
                  {{ t('BUTTONS.LOGIN') }}
                </v-btn>
              </template>
            </GenericForm>
          </div>
        </div>
      </v-col>
    </v-row>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/authLayout.vue'
import authImage from '@/assets/images/auth/login_bck.png'
import AuthSide from '@/components/specific/authSide.vue'
import authHeading from '@/components/specific/authHeading.vue'
import { validateSchema } from '@/composables/useValidation'

import GenericForm from '@/components/common/GenericForm/index.vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { transformSchemaToObject } from '@/utils/formDataHandler'
import { ref } from 'vue'
const { t } = useI18n()
const authStore = useAuthStore()
const isReset = ref(true)

const login = async (data) => {
  const form = transformSchemaToObject(data)
  await authStore.signIn(form)
}

const schema = [
  {
    type: 'text',
    key: 'email',
    label: t('FIELDS.EMAIL'),
    required: true,
    autocomplete: 'one-time-code',
    cols: { lg: 12, md: 12 },
    rules: [(v) => /.+@.+\..+/.test(v) || t('ERRORS.EMAIL_INVALID')]
  }
]

const OTPSchema = [
  {
    type: 'otp',
    key: 'otp',
    otpLength: 6,
    cols: { lg: 12, md: 12 }
  }
]
</script>

<style scoped lang="scss">
.auth-bg {
  position: absolute;
  background: rgba(var(--v-theme-primary), 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 3rem;
  gap: 1.5rem;
  color: rgba(var(--v-theme-white), $alpha: 1);
  img {
    max-width: 592px !important;
    max-height: 557px;
    height: 60vh;
  }
  p {
    text-align: center;
    max-width: 480px;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.2px;
  }
}

.auth-form {
  padding: 7.81rem !important;
}

.min-h-100 {
  min-height: 100vh;
}

@media (min-width: 960px) {
  .h-md-100 {
    height: 100% !important;
  }
}

@media (max-width: 500px) {
  .h-120vh {
    height: 120vh !important;
  }
}
</style>
