<template>
    <ProfileCard>
        <GenericForm :schema="schema" :props-to-watch="[]">
            <template #avatar>
                <AvatarUploader ref="avatarRef" v-model="schema[0].value" required label="Upload a profile picture"
                    accept="image/*" extensions="jpg,svg,jpeg,png,bmp,gif,webp"
                    :preview-url="schema[0].value ?? avatarImage" @browse-avatar="openAvatarBrowser" />
            </template>
        </GenericForm>

        <h2 class="user-name">
            {{ user.name }}
        </h2>
        <span class="user-position">
            {{ user.position?.translation_name }}
        </span>

        <v-list class="pa-0 w-100" height="100%">
            <v-list-item class="pa-0" variant="text" min-height="fit-content">
                <template v-slot:prepend>
                    <UserMail />
                </template>

                <v-list-item-title>
                    {{ user.email }}
                </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" variant="text" min-height="fit-content">
                <template v-slot:prepend>
                    <UserPhone />
                </template>

                <v-list-item-title>
                    {{ user.phone ?? '-----------' }}
                </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" variant="text" min-height="fit-content">
                <template v-slot:prepend>
                    <UserTime />
                </template>

                <v-list-item-title>
                    {{ user.country_name ?? '-----------' }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <v-list class="pa-0 w-100" height="100%">
            <v-list-item class="pa-0" variant="text" min-height="fit-content">
                <v-list-item-title>
                    <div class="d-flex flex-column">
                        <span class="sub_title">
                            {{ t('dl.department') }}
                        </span>

                        <h4 class="title">
                            {{ user.department?.translation_name }}
                        </h4>
                    </div>
                </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" variant="text" min-height="fit-content">
                <v-list-item-title>
                    <div class="d-flex flex-column ga-1">
                        <span class="sub_title">
                            {{ t('dl.sector') }}
                        </span>

                        <h4 class="title">
                            {{ user.section?.translation_name }}
                        </h4>
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </ProfileCard>
</template>

<script setup>
import ProfileCard from '@/views/profile/components/ProfileCard.vue';
import GenericForm from '@/components/common/GenericForm/index.vue';
import AvatarUploader from '@/components/common/AvatarUploader/index.vue'
import UserMail from '@/assets/images/svg/user-mail.svg'
import UserPhone from '@/assets/images/svg/user-phone.svg'
import UserTime from '@/assets/images/svg/user-time.svg'
import avatarImage from '@/assets/images/svg/avatar.svg?row'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue';


const avatarRef = ref(null);

const props = defineProps({
    user: Object
});


const schema = ref([
    {
        id: '0',
        type: 'slot',
        key: 'avatar',
        label: '',
        value: null,
        required: false,
        cols: {
            lg: 12,
            md: 12
        },
        rules: '',
        name: 'userAvatar'
    }
]);


const openAvatarBrowser = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (avatarRef.value?.browseImage) {
        avatarRef.value.browseImage()
    }
}


const emit = defineEmits(['watchSchema']);


watch(
    schema.value,
    (newValue) => {
        emit('watchSchema', newValue)
    },
    { deep: true }
);

</script>

<style lang="scss" scoped>
.user-name {
    width: fit-content;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 140%;
    margin-bottom: .5rem;
}

.user-position {
    width: fit-content;
    font-size: 1rem;
    font-weight: 400;
    line-height: 160%;
    color: rgba(var(--v-theme-text), 1);
}

.user-divider {
    margin: 1.5rem 0;
}

.title {
    font-size: 1rem;
    font-weight: 500;
    line-height: 160%;
}

.sub_title {
    font-size: .875rem;
    font-weight: 500;
    line-height: 160%;
    color: rgba(var(--v-theme-text), 1);
}

.v-card::v-deep {
    align-items: center;

    .v-form {
        .generic-form-rows {
            margin-top: 0 !important;

            .v-col-12 {
                padding: 0 !important;

                .avtar_uploader-preview-cont {
                    border: transparent;
                    margin-bottom: 1.5rem;

                    .avtar_uploader {
                        width: 6.25rem;
                        height: 6.25rem;
                        background-color: rgba(var(--v-theme-primary), 1);

                        .uploader-preview {
                            padding: 0;

                            img {
                                border: none;
                            }
                        }
                    }

                    .uploader-cancel {
                        display: none;
                        bottom: 0;
                        right: .5rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        cursor: pointer;
                        border: 1px dashed rgba(var(--v-theme-white), 1);
                    }
                }
            }
        }
    }

    .v-list {
        border-top: 1px solid rgba(var(--v-theme-paginationBorder), 1);
        padding-top: 1.5rem !important;
        margin-top: 1.5rem !important;
        // border-bottom: 1px solid rgba(var(--v-theme-paginationBorder), 1);

        .v-list-item {
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }

            .v-list-item-title {
                margin-inline-start: .625rem;
                font-size: .875rem;
                font-weight: 600;
                line-height: 160%;
            }
        }
    }

    .v-list-item__spacer {
        width: 0;
    }
}
</style>
