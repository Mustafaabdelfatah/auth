<template>
    <div class="ps-lg-5 pe-lg-6 pb-10 ">
        <v-row class="mt-5">
            <v-col cols="12" md="3" class="">
                <ProfileHighlight v-if="user != null" :user="user" @watch-schema="profileHighlights" />
            </v-col>
            <v-col cols="12" md="9" class="">
                <ProfileDataEmployee v-if="user != null" :user="user" @watch-schema="profileData">
                </ProfileDataEmployee>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { getUsersById, updateProfile } from '@/services/apis/users'
import ProfileHighlight from '@/views/profile/components/ProfileHighlight.vue'
import ProfileDataEmployee from '@/views/employees/components/ProfileDataEmployee.vue'
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






<!-- <template>
    <div class="ps-lg-5 pe-lg-6">
        {{ route.params.id }}
    </div>
</template>

<script setup>
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'

import { useRoute } from 'vue-router';
const route = useRoute();

// =====( Set Page Breadcrumbs )====== //
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.employees',
        disabled: false,
        href: '/employees'
    },
    {
        title: 'dl.employee',
        disabled: true,
        href: `/employees/${route.params.id}`
    }
]);

</script>

<style lang="scss" scoped>

</style> -->
