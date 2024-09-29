<template>
    <AuthLayout>
        <v-row no-gutters class="bg-white h-screen h-120vh">
            <v-col cols="12" md="6" class="pa-0 ma-0 h-50 h-md-100" style="overflow: hidden">
                <img src="@/assets/images/auth/login_bck.png" class="h-100 w-100" style="max-width: 100%" />
            </v-col>
            <v-col cols="12" md="6" class="h-50 h-md-100">
                <div class="w-100 h-100 d-flex align-center flex-column pa-8 pa-md-15 justify-center">
                    <v-progress-linear :active="authStore.isLoading" color="primary" rounded :indeterminate="authStore.isLoading" absolute bottom />

                    <auth-heading :title="t('headings.auth_title')" :description="t('headings.auth_desc')" />
                    <div class="w-100">
                        <GenericForm :schema="schema" @submit="login">
                            <template #submit>
                                <v-btn type="submit" color="primary" block elevation="0" min-height="50"
                                    class="py-5 font-weight-bold mt-7">
                                    {{ t('buttons.sign_in') }}
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
import authHeading from '@/components/specific/authHeading.vue'
import GenericForm from '@/components/common/GenericForm/index.vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { transformSchemaToObject } from '@/utils/formDataHandler'

const { t } = useI18n()
const authStore = useAuthStore()

const login = async (data) => {
    const form = transformSchemaToObject(data)
    await authStore.signIn(form)
}

import smsIcon from '@/assets/images/svg/sms.svg'
import lockIcon from '@/assets/images/svg/lock.svg'

const schema = [
    {
        type: 'text',
        key: 'email',
        label: t('FIELDS.EMAIL'),
        placeholder: t('FIELDS.EMAIL'),
        required: true,
        autocomplete: 'one-time-code',
        cols: { lg: 12, md: 12 },
        rules: [
            (v) => !!v || t('ERRORS.EMAIL_REQUIRED'),
            (v) => /.+@.+\..+/.test(v) || t('ERRORS.EMAIL_INVALID')
        ]
    },
    {
        type: 'password',
        key: 'password',
        label: t('FIELDS.PASSWORD'),
        placeholder: t('FIELDS.PASSWORD'),
        required: true,
        switchPassword: true,
        autocomplete: 'current-password',
        cols: { lg: 12, md: 12 },
        classList: 'mb-4',
        rules: [(v) => !!v || t('ERRORS.PASSWORD_REQUIRED')]
    },
    {
        type: 'remember-me',
        key: 'forgot-password',
        label: t('FIELDS.REMEMBER_ME')
    }
]
</script>

<style scoped>
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
