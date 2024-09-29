<template>
    <ProfileCard>
        <Tabs :tabs="tabs" initialTab="general">
            <template v-slot:general>
                <GenericForm @submit="submitForm" :schema="schema" :props-to-watch="[]"></GenericForm>
            </template>
            <template v-slot:documents>
                <div class="pa-1">
                    <v-row class="mt-5">
                        <v-col cols="12" md="6" class="text-center"
                            v-for="(single, index) in data['user.user_attachment_type']" :key="single.value">
                            <FilesUploader :multiple="false" :singleKey="single.label" v-model="files[single.value]"
                                :class="{ 'file-uploaded': files[single.value] }">
                                <v-btn :append-icon="eye" variant="text" class="btn-upload" size="sm">
                                    {{ t('models.show') }}
                                </v-btn>
                            </FilesUploader>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </Tabs>
    </ProfileCard>
</template>

<script setup>
import ProfileCard from '@/views/profile/components/ProfileCard.vue';
import GenericForm from '@/components/common/GenericForm/index.vue';
import eye from '@/assets/images/svg/eye.svg'
import UserPhone from '@/assets/images/svg/user-phone.svg'
import UserTime from '@/assets/images/svg/user-time.svg'

import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'


import { ref, reactive, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const avatarRef = ref(null);

import Tabs from '@/components/common/Tabs/index.vue'
const tabs = ref([
    { value: 'general', label: t('buttons.general') },
    { value: 'documents', label: t('buttons.documents') }
]);

const props = defineProps({
    user: Object,
});


const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name',
        label: t('headings.user_name'),
        placeholder: t('headings.user_name'),
        value: null,
        disabled: true,
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 1,
        type: 'text',
        key: 'email',
        label: t('FIELDS.EMAIL'),
        placeholder: t('FIELDS.EMAIL'),
        autocomplete: 'one-time-code',
        value: null,
        cols: { lg: 6, md: 12 },
        disabled: true,
    },
    {
        id: 2,
        type: 'phone',
        key: 'phone',
        label: t('FIELDS.PHONE'),
        placeholder: t('FIELDS.PHONE'),
        autocomplete: 'one-time-code',
        value: null,
        disabled: true,
        cols: { lg: 6, md: 12 }
    },
    {
        id: 3,
        type: 'datepicker',
        key: 'birth_date',
        label: t('headings.birth_date'),
        placeholder: t('headings.birth_date'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 4,
        type: 'datepicker',
        key: 'joining_date',
        label: t('headings.joining_date'),
        placeholder: t('headings.joining_date'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 8,
        type: 'text',
        key: 'department',
        label: t('headings.main_department'),
        placeholder: t('headings.main_department'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 9,
        type: 'text',
        key: 'sub_department',
        label: t('headings.sub_department'),
        placeholder: t('headings.sub_department'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 5,
        type: 'text',
        key: 'job_title',
        label: t('headings.job_title'),
        placeholder: t('headings.job_title'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 6,
        type: 'text',
        key: 'section',
        label: t('headings.sector'),
        placeholder: t('headings.sector'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 7,
        type: 'text',
        key: 'technical_level',
        label: t('headings.technical_level'),
        placeholder: t('headings.technical_level'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 8,
        type: 'text',
        key: 'salary',
        label: t('headings.salary'),
        placeholder: t('headings.salary'),
        value: null,
        disabled: true,
        cols: {
            lg: 6,
            md: 12
        }
    },
]);



const returnData = async () => {
    await updateSchemaValues(schema.value ,props.user)
}


const emit = defineEmits(['watchSchema']);


watch(
    schema.value,
    (newValue) => {
        emit('watchSchema', newValue)
    },
    { deep: true }
);


onMounted(async ()=> {
    await returnData()
});


import FilesUploader from '@/components/common/FilesUploader/index.vue'
const queryEnumsParams = {
    enums: [
        { name: 'user.user_attachment_type' }
    ]
};
import { getGenerals, getEnumsGenerals } from '@/services/apis/general';
const data = await getEnumsGenerals(queryEnumsParams);

const files = reactive([]);
const schemaData = defineModel();
watch(
    files,
    (newValue, oldValue) => {
        schemaData.value = newValue
        console.log('oldValue', oldValue);
        console.log('newValue', newValue);
    },
    { deep: true }
);

</script>

<style lang="scss" scoped>
::v-deep {
    .v-tabs {
        .v-slide-group__content {
            gap: .5rem;
            padding-bottom: .1rem;
        }

        .v-btn {
            height: 2.5rem;
            min-width: 6.5rem;
            // border-bottom: 2px solid transparent;
            position: relative;
            // border-radius: 0 !important;

            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: transparent;
                border-radius: 20px;
            }


            &.v-tab-item--selected {
                color: rgba(var(--v-theme-primary), 1);

                &::before {
                    background-color: rgba(var(--v-theme-primary), 1);
                }

                // border-color: rgba(var(--v-theme-primary), 1);
            }
        }
    }



    .file-uploaded {
        color: #17B26A;
    }

    .file-title {
        color: rgba(var(--v-theme-on-surface), 1);
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.25rem;
        text-align: start;
    }

    .file-type {
        &.v-avatar--size-default {
            --v-avatar-height: fit-content;
        }
    }

    .btn-upload {
        padding: .4rem .75rem;
        border: 1px dashed rgba(var(--v-theme-primary), 1);
        color: rgba(var(--v-theme-primary), 1);
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.25rem !important;
        border-radius: .5rem !important;

        .v-btn__append {
            margin-inline-start: .3rem;
        }
    }




    .file-size {
        color: rgba(var(--v-theme-text), 1);
        font-size: .625rem;
        font-weight: 400;
        line-height: 1.25rem;
    }

    .v-btn__append {
        margin-inline-start: .875rem;
    }

    .v-btn .v-icon {
        --v-icon-size-multiplier: 1 !important;

        svg {

            transform: scale(1.2);
        }
    }

    .file-uploader {
        padding: .75rem;
        border-radius: .5rem;
        border: 1px solid rgba(var(--v-theme-fileUploaderBorder), .5);
    }
}
</style>
