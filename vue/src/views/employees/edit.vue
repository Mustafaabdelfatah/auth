<template>
    <div class="ps-lg-5 pe-lg-6" v-if="!loading">
        <Tabs :tabs="tabs" initialTab="first" :slotLabel="true" :grow="true" v-model="currentTap">

            <template #stepOne>
                <div class="single-step">
                    <div class="circle">
                        {{ locale === 'ar' ? useNumConverter(1) : 1 }}
                    </div>
                    <div class="tab-title">
                        <p>
                            {{ t('buttons.step') }} {{ locale === 'ar' ? useNumConverter(1) : 1 }}
                        </p>
                        <span>
                            {{ t('buttons.basic_data') }}
                        </span>
                    </div>
                </div>
            </template>
            <template #stepTwo>
                <div class="single-step">
                    <div class="circle">
                        {{ locale === 'ar' ? useNumConverter(2) : 2 }}
                    </div>
                    <div class="tab-title">
                        <p>
                            {{ t('buttons.step') }} {{ locale === 'ar' ? useNumConverter(2) : 2 }}
                        </p>
                        <span>
                            {{ t('buttons.internal_data') }}
                        </span>
                    </div>
                </div>
            </template>
            <template #stepThree>
                <div class="single-step">
                    <div class="circle">
                        {{ locale === 'ar' ? useNumConverter(3) : 3 }}
                    </div>
                    <div class="tab-title">
                        <p>
                            {{ t('buttons.step') }} {{ locale === 'ar' ? useNumConverter(3) : 3 }}
                        </p>
                        <span>
                            {{ t('buttons.attachments_data') }}
                        </span>
                    </div>
                </div>
            </template>


            <template v-slot:first>
                <h3 class="step-title">
                    {{ t('buttons.basic_data') }}
                </h3>
                <BasicDataStep v-model="employeeBasicData" :editData="singleUser" />
            </template>
            <template v-slot:second>
                <h3 class="step-title">
                    {{ t('buttons.internal_data') }}
                </h3>
                <InternalDataStep v-model="employeeInternalData" :editData="singleUser" />
            </template>
            <template v-slot:third>
                <h3 class="step-title">
                    {{ t('buttons.attachments_data') }}
                </h3>
                <AttachmentsData v-model="employeeAttachmentData" class="mt-5" />
            </template>

        </Tabs>

        <div class="generic-form-actions d-flex align-center justify-end ga-3 w-100">
            <v-btn @click="dialog = false" class="d-flex border-thin px-5 " flat variant="outlined" border="opacity-50"
                height="42">
                {{ t('buttons.cancel') }}
            </v-btn>
            <v-btn @click="edit" v-ripple="{ class: `text-secondary` }"
                class="d-flex px-5 text-white  border-secondary bg-secondary" flat height="42" type="button" :loading="appStore.buttonLoading">
                {{ t('buttons.edit') }}
            </v-btn>
        </div>
    </div>
    <div v-else class="ps-lg-5 pe-lg-6">
        <v-skeleton-loader  type="heading, divider, article, article, actions"></v-skeleton-loader>
    </div>
</template>

<script setup>
// =(Components)=============>
import Tabs from '@/components/common/Tabs/index.vue'
import BasicDataStep from '@/views/employees/components/BasicDataStep.vue'
import InternalDataStep from '@/views/employees/components/InternalDataStep.vue'
import AttachmentsData from '@/views/employees/components/AttachmentsData.vue'


// =(Functions)=============>
import { ref, onMounted, watch, computed } from 'vue';
import { updateSchemaValues, transformSchemaToObject } from '@/utils/formDataHandler'
import { useNumConverter } from '@/composables/useNumConverter.js'
import { createUsers, getUsersById, updateUsers } from '@/services/apis/users.js'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
const { setBreadcrumbs } = useBreadcrumbs();
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();


import { useAppStore } from '@/stores/app'
const appStore = useAppStore();


// =(Static Data)==========>
const tabs = ref([
    { value: 'first', label: 'stepOne', disabled: false },
    { value: 'second', label: 'stepTwo', disabled: true },
    { value: 'third', label: 'stepThree', disabled: true }
]);



const ignoreFields = ref(["sub_department_id"]);


function validateObject(obj, ignoreFields = []) {
    for (const [key, value] of Object.entries(obj)) {
        if (!ignoreFields.includes(key)) {
            if (value === null || value === "") {
                return true;
            }
        }
    }
    return false;
}


// =(Data)=================>
const employeeBasicData = ref(null);
const employeeInternalData = ref(null);
const employeeAttachmentData = ref(null);
const singleUser = ref(null);
const currentTap = ref(null);
const loading = ref(false);



const stepThreeSchema = data => {
    let keys = [];
    let values = [];
    Object.keys(data).forEach(key => {
        keys.push(key)
    })
    Object.values(data).forEach(value => {
        values.push(value)
    })

    const all = keys.map((key, index) => ({
        type: Number(key),
        file: values[index]
    }))

    return all
}



const edit = async () => {
    appStore.buttonLoading = true
    const basicData = transformSchemaToObject(employeeBasicData.value);
    const internalData = transformSchemaToObject(employeeInternalData.value);

    const allData = {
        ...basicData,
        ...internalData,
    }
    allData['attachments'] = stepThreeSchema(employeeAttachmentData.value);
    await updateUsers(route.params.id, allData).finally(() => {
        appStore.buttonLoading = false
    })
    router.push('/employees');
}


// =(Watchers)================>
watch(
    employeeBasicData,
    (newValue) => {
        if (newValue) {
            const form = transformSchemaToObject(newValue)
            const isValid = computed(() => validateObject(form));
            tabs.value[1].disabled = isValid.value;
        }
    },
    { deep: true }
);

watch(
    employeeInternalData,
    (newValue) => {
        if (newValue) {
            const form = transformSchemaToObject(newValue)
            const isValid = computed(() => validateObject(form));
            tabs.value[2].disabled = isValid.value;
        }
    },
    { deep: true }
);


// =(Breadcrumbs)==========>
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
        title: 'headings.edit',
        disabled: true,
        href: '/employees/edit'
    }
]);




onMounted(async () => {
    loading.value = true
    const user = await getUsersById(route.params.id);
    singleUser.value = user;
    loading.value = false
    console.log('singleUser.value', singleUser.value);

});


</script>

<style lang="scss" scoped>
.step-title {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.688rem;
    margin-top: .5rem;
}

::v-deep {
    .generic-form-actions {
        position: fixed;
        bottom: 0;
        padding: 1.5rem;
        /* max-height: 130px; */
        right: 0;
        box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.10);
        background-color: rgba(var(--v-theme-white), 1);

        button {
            display: flex;
            width: 9.375rem;
            // height: 56px;
            padding: 1.313rem 1.5rem;
            border-radius: .625rem;
        }
    }


    .v-tabs {
        gap: .5rem;
        height: 100%;
        // width: fit-content;
        color: rgba(var(--v-theme-text), 1);


        // .v-slide-group__container {
        //     padding-inline-start: .8rem;

        //     &::before {
        //         content: '';
        //         position: absolute;
        //         right: 0;
        //         height: 70%;
        //         width: 5px;
        //         background-color: rgba(var(--v-theme-primary), 1);
        //         top: 50%;
        //         transform: translateY(-50%);
        //         border-radius: 1rem;
        //     }
        // }


        .v-slide-group__content> :not(:last-child) {
            margin-inline-end: 1.438rem;
            // margin-inline-start: 1rem;
        }

        .v-btn {
            display: flex !important;
            justify-content: start;
            height: 100%;
            font-weight: 700;
            font-size: .875rem;
            line-height: 1.5rem;
            padding: .875rem 1.25rem;
            border: 2px solid rgba(var(--v-theme-tabsBorder), 1);
            border-radius: .75rem !important;
            // width: 100%;

            .v-btn__content {
                width: inherit !important;
                // padding-inline: 1.25rem;
                justify-content: start;
            }
        }

        .v-btn.v-tab-item--selected {
            border-color: rgba(var(--v-theme-tabsActiveBorder), .4);
            background-color: rgba(var(--v-theme-primary), 1);
            color: rgba(var(--v-theme-white), 1);
            position: relative;
            margin-inline-start: .9rem;

            &::before {
                content: '';
                position: absolute;
                right: -1rem;
                height: 70%;
                width: 5px;
                background-color: rgba(var(--v-theme-primary), 1);
                top: 50%;
                transform: translateY(-50%);
                border-radius: 1rem;
            }


            .single-step {
                .tab-title {
                    color: rgba(var(--v-theme-white), 1);
                }
            }

        }

    }
}

.single-step {
    display: flex;
    align-items: center;
    gap: .5rem;
    letter-spacing: normal;


    .circle {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-indent: initial !important;
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 1.188rem;
        font-family: "PublicSans", sans-serif !important;
        border: 2px solid rgba(var(--v-theme-white), 1);
        color: rgba(var(--v-theme-white), 1);
        background-color: rgba(var(--v-theme-primary), 1);

    }

    .tab-title {
        text-align: start;
        letter-spacing: -0.28px;
        color: rgba(var(--v-theme-on-surface), 1);

        p {
            margin-bottom: .25rem;
            font-weight: 400;
            font-size: .875rem;
            line-height: 1.25rem;
        }

        span {
            font-weight: 700;
            font-size: .875rem;
            line-height: 1.25rem;
        }
    }
}
</style>
