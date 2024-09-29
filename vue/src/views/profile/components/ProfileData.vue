<template>
    <ProfileCard>
        <div class="d-flex justify-space-between w-100">
            <h4 class="pb-4">
                {{ t('dl.account') }}
            </h4>
            <EditBtn :size="30" variant="tonal" @click="goToEdit" />
        </div>
        <v-divider class="mb-2" color="tableBodyBorder" :opacity="1"></v-divider>
        <GenericForm :schema="schema" :props-to-watch="[]"></GenericForm>
        <slot></slot>
    </ProfileCard>
</template>

<script setup>
import ProfileCard from '@/views/profile/components/ProfileCard.vue';
import EditBtn from '@/components/common/buttons/EditBtn.vue';
import GenericForm from '@/components/common/GenericForm/index.vue';
import { validationByKey } from '@/composables/useValidation'
import { updateSchemaValues } from '@/utils/formDataHandler'


import { ref, reactive, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();


const props = defineProps({
    user: Object,
});

const goToEdit = () => {
    router.push(`/employees/edit/${route.params.id}`);
}



const schema = ref([
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
        id: 3,
        type: 'phone',
        key: 'phone',
        label: t('headings.phone'),
        placeholder: t('headings.phone'),
        value: '',
        // required: true,
        rules: [
            (v) => !!v || t('ERRORS.PHONE'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: '4',
        type: 'password',
        key: 'password',
        label: t('headings.password'),
        placeholder: t('inputs.enter_password'),
        value: null,
        required: false,
        cols: {
            lg: 6,
            md: 12
        },
        rules: [
            (value) => {
                if (!value) return t('validation.required')
                else if (value.length < 8) return t('validation.minPassword')
                return true
            }
        ],
        name: 'userPassword'
    },
    {
        id: '5',
        type: 'password',
        key: 'password_confirmation',
        label: t('headings.password_confirmation'),
        placeholder: t('inputs.enter_confirm_password'),
        value: null,
        required: false,
        cols: {
            lg: 6,
            md: 12
        },
        rules: [
            (value) => {
                if (value === validationByKey(schema.value, 'password')) return true
                return 'confirm please'
            }
        ],
        name: 'userPassword'
    },
]);



const returnData = async () => {
    await updateSchemaValues(schema.value, props.user)
}

const emit = defineEmits(['watchSchema']);

watch(
    schema.value,
    (newValue) => {
        emit('watchSchema', newValue)
        console.log('schema', newValue);

    },
    { deep: true }
);

onMounted(async () => {
    await returnData()
});

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
