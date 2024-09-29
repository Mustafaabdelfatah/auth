<template>
    <div>
        <GenericForm @submit="updateUserProfile" :schema="schema">
            <template #password-header>
                <div class="d-flex align-center">
                    <img class="text-primary" src="@/assets/images/icons/edit.svg" />
                    <h5 class="mx-2 mt-1 font-weight-bold">{{ t('headings.change_password') }}</h5>
                </div>
            </template>
            <template #submit>
                <v-btn variant="flat" color="primary" class="font-weight-bold mt-5" min-height="40" min-width="150"
                    elevation="0" type="submit">
                    {{ t('buttons.save_info') }}
                </v-btn>
            </template>
        </GenericForm>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import GenericForm from '@/components/common/GenericForm/index.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const { t } = useI18n()

import { validateSchema } from '@/composables/useValidation'
import { transformSchemaToObject } from '@/utils/formDataHandler'

const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name',
        label: t('headings.name'),
        placeholder: t('headings.last_name_example'),
        value: authStore.user?.name,
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: 1,
        type: 'text',
        key: 'email',
        label: t('headings.email'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: authStore.user?.email,
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: 3,
        type: 'text',
        key: 'phone_number',
        label: t('headings.phone'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: authStore.user?.phone,
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: 4,
        type: 'divider',
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 12,
        key: 'password-header',
        type: 'slot',
        label: t('headings.new_password'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: [],
        required: true,
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: '5',
        key: 'password',
        type: 'password',
        label: t('headings.new_password'),
        placeholder: t('headings.new_password'),
        value: '',
        switchPassword: true,
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: '6',
        key: 'password_confirmation',
        type: 'password',
        label: t('headings.new_password_confirmation'),
        placeholder: t('headings.new_password_confirmation'),
        value: '',
        switchPassword: true,
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    }
])

const updateUserProfile = (data) => {
    let payload = transformSchemaToObject(data)
    authStore.updateUser(payload)
}
</script>
<style lang=""></style>
