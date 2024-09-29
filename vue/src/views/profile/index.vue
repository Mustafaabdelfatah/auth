<template>
    <div class="ps-lg-5 pe-lg-6 pb-10 ">
        <v-row class="mt-5">
            <v-col cols="12" md="3" class="">
                <ProfileHighlight v-if="user != null" :user="user" @watch-schema="profileHighlights" />
            </v-col>
            <v-col cols="12" md="9" class="">
                <ProfileData v-if="user != null" :user="user" @watch-schema="profileData">
                    <div class="d-flex align-center justify-end ga-3 w-100 actions-shadow mt-8">
                        <v-btn @click="dialog = false" class="d-flex border-thin px-5 border-error bg-error" rounded="6px"
                            border="opacity-50" height="42">
                            {{ t('buttons.cancel') }}
                        </v-btn>
                        <v-btn v-ripple="{ class: `text-secondary` }" @click="submitProfileData"
                            class="d-flex border-thin px-5 text-white  border-secondary bg-secondary" rounded="6px"
                            border="opacity-50" height="42" type="button" :loading="appStore.buttonLoading">
                            {{ t('buttons.edit') }}
                        </v-btn>
                    </div>
                </ProfileData>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { getUsersById, updateProfile } from '@/services/apis/users'
import ProfileHighlight from '@/views/profile/components/ProfileHighlight.vue'
import ProfileData from '@/views/profile/components/ProfileData.vue'
import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'

import { useAppStore } from '@/stores/app'
const appStore = useAppStore();
import { useRoute } from 'vue-router';
const route = useRoute();

// route.params.id


import { useI18n } from 'vue-i18n'
const { t } = useI18n();


const user = ref(null)
const profileHighlightsSchema = ref([])
const profileDataSchema = ref([])


const profileHighlights = (schema) => {
    profileHighlightsSchema.value = schema;
}

const profileData = (schema) => {
    profileDataSchema.value = schema;
}

const submitProfileData = async () => {
    const form = [
        ...profileHighlightsSchema.value,
        ...profileDataSchema.value,
    ]

    const data = transformSchemaToObject(form)
    await updateProfile(data)
    console.log('user.value', data)
};

const fetchSingleUser = async () => {
    const data = await getUsersById(route.params.id)
    user.value = data;
    console.log('user.value', user.value)
};


// =====( Set Page Breadcrumbs )====== //
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.profile',
        disabled: true,
        href: '/profile'
    }
]);


onMounted(async () => {
    await fetchSingleUser()
});

</script>

<style lang="scss" scoped></style>
