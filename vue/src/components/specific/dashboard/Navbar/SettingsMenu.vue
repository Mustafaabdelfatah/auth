<template>
    <v-menu key="language-menu" close-delay="100" location="bottom end" open-delay="60" :close-on-content-click="true"
        :open-on-hover="false">
        <template #activator="{ props }">
            <v-badge :content="9" dot floating offset-x="31" offset-y="31" rounded="xs" overlap color="success">
                <v-btn v-bind="props" icon>
                    <v-img aspect-ratio="1/1" :src="authStore.user.avatar ?? avatarImage" width="32" height="32"
                        class="rounded-pill cover">
                        <template #placeholder>
                            <v-skeleton-loader type="avatar" width="40" height="40" class="ma-0" />
                        </template>
                    </v-img>
                </v-btn>
            </v-badge>
        </template>
        <v-sheet class="overflow-hidden profile_wrapper" rounded>
            <v-list elevation="4" class="px-3" density="comfortable">
                <template v-for="item in links" :key="item.title">
                    <v-divider v-if="item.type === 'divider'" class="my-2" />
                    <v-list-item v-else @click="handle($event, item)" :to="item.to"
                        :disabled="item.hasLoader && authStore.isLoading">
                        <v-list-item-title class="">
                            <div class="d-flex align-center">
                                <v-icon size="16" v-if="item.key == 'home'" color="primary">mdi-account-box</v-icon>
                                <v-icon size="16" v-if="item.key == 'logout'" color="error">mdi-logout</v-icon>
                                <span class="mx-1 profile_option">{{ item.title }}</span>
                            </div>
                            <v-progress-circular v-if="item.hasLoader && authStore.isLoading" color="dark"
                                bg-color="transparent" indeterminate size="18" width="2"
                                class="ms-2"></v-progress-circular>
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-list>
        </v-sheet>
    </v-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import avatarImage from '@/assets/images/svg/avatar.svg?row'

const { t } = useI18n()
const authStore = useAuthStore()
const handle = (event, item) => {
    if (item.fn) {
        event.preventDefault()
        item.fn()
    }
}

const links = ref([
    { title: t('buttons.profile'), to: `/profile/${authStore.user.id}`, key: 'home' },
    {
        title: t('buttons.logout'),
        hasLoader: true,
        fn: () => authStore.logOut(),
        to: '',
        key: 'logout'
    }
]);
</script>

<style lang="scss" scoped>
::v-deep {
    .v-badge__wrapper {
        width: 32px;
        height: 32px;
    }

    .v-btn--icon.v-btn--density-default {
        width: 32px;
        height: 32px;
    }
}

.cover {
    img {
        object-fit: cover;
    }
}

.profile_wrapper {
    border-radius: 7px !important;
    border: 1px solid #eaecf0 !important;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08) !important;
    min-height: 70px;

    .v-list {
        padding: 0 !important;

        .v-list-item {
            margin-bottom: 0;
            padding: 8px;
            border-radius: 0;

            &:first-child {
                border-bottom: 1px solid #eaecf0;
            }
        }
    }
}

.profile_option {
    font-size: 12px;
    font-weight: 700;
}
</style>
