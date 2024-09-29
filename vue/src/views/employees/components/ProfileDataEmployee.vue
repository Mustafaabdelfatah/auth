<template>
    <ProfileCard>
        <Tabs :tabs="tabs" initialTab="internal">
            <template v-slot:general>
                <ShowBasicDataStep :user="user" />
            </template>
            <template v-slot:internal>
                <ShowInternalDataStep :user="user" />
            </template>
            <template v-slot:documents>
                <div class="pa-1">
                    <v-row class="mt-5">
                        <v-col cols="12" md="6" class="text-center"
                            v-for="(single, index) in data['user.user_attachment_type']" :key="single.value">
                            <FilesUploader :uploadBtn="false" :showSize="false" :multiple="false" :singleKey="single.label" v-model="files[single.value]"
                                :class="{ 'file-uploaded': files[single.value] }" >
                                <!-- <v-btn :append-icon="eye" variant="text" class="btn-upload" size="sm">
                                    {{ t('models.show') }}
                                </v-btn> -->
                            </FilesUploader>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </Tabs>
    </ProfileCard>
</template>

<script setup>
import Tabs from '@/components/common/Tabs/index.vue'
import ProfileCard from '@/views/profile/components/ProfileCard.vue';
import ShowBasicDataStep from '@/views/employees/components/ShowBasicDataStep.vue';
import ShowInternalDataStep from '@/views/employees/components/ShowInternalDataStep.vue';
import FilesUploader from '@/components/common/FilesUploader/index.vue'

import { ref, reactive, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n();


const currentTab = ref(null)

const tabs = ref([
    { value: 'general', label: t('buttons.basic_data') },
    { value: 'internal', label: t('buttons.internal_data') },
    { value: 'documents', label: t('buttons.attachments_data') }
])

const props = defineProps({
    user: Object,
});


const emit = defineEmits(['watchSchema']);

const queryEnumsParams = {
    enums: [
        { name: 'user.user_attachment_type' }
    ]
};
import { getGenerals, getEnumsGenerals } from '@/services/apis/general';
const data = await getEnumsGenerals(queryEnumsParams);
const files = reactive([...props.user.attachments]);


</script>

<style lang="scss" scoped>
::v-deep {
    .v-list {
        .v-list-item {
            display: flex;
        }

        .v-list-item__prepend {
            min-width: 20%;
            font-size: 1rem;
            font-weight: 400;
            line-height: 160%;
            color: rgba(var(--v-theme-text), 1);

        }

        .v-list-item-title {
            font-size: 1rem;
            font-weight: 600;
            line-height: 160%;
        }

    }

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
