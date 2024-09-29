<template>
    <v-navigation-drawer color="secondary" v-model="appStore.drawer" :absolute="false" elevation="0" width="260"
        height="100svh" :border="1" :rail="appStore.drawerRail" :rail-width="appStore.drawerWith"
        @mouseenter="appStore.handleMouseEnter()" @mouseleave="appStore.handleMouseLeave()">
        <template #prepend>
            <v-list-item lines="one" density="default" class="d-flex  align-center w-100"
                v-if="appStore.drawerTitlesShow">
                <template v-slot:prepend>
                    <v-img v-if="settingsStore.getProperties.website_logo_large != null" :src="appLogo.large"
                        @error="onError('large')" class="logo-large mx-auto">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <div class="logo-large" v-else>
                        <component :is="appLogo.large"></component>
                    </div>
                </template>

                <template v-slot:append>
                    <v-btn class="pa-0" density="compact" elevation="0" max-width="28" min-width="28" width="28"
                        height="28" @click.stop="openDrawer()">
                        <!-- <v-img :src="navbarIcon" width="20" class="mx-auto"> </v-img> -->
                        <navbarIcon></navbarIcon>
                    </v-btn>
                </template>
            </v-list-item>

            <v-list-item lines="one" density="default" class="text-center" v-else>
                <v-img v-if="settingsStore.getProperties.website_logo_small != null" :src="appLogo.small"
                    @error="onError('small')" width="32" height="25" class="mx-auto">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <div class="d-flex align-center justify-center svg-controller" v-else>
                    <component :is="appLogo.small"></component>
                </div>
            </v-list-item>
        </template>

        <template>
            <v-list-item to="/" lines="one" density="default" class="d-flex justify-space-between"
                v-if="appStore.drawerTitlesShow">
                <v-img v-if="settingsStore.getProperties.website_logo_large != null" :src="appLogo.large"
                    @error="onError('large')" width="107" height="25" class="mx-auto">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <div v-else>
                    <component :is="appLogo.large"></component>
                </div>
            </v-list-item>
        </template>

        <!-- <v-divider class="mb-4 mx-4"></v-divider> -->

        <v-list density="comfortable" class="" bg-color="secondary">
            <template v-for="(link, index) in links" :key="index">
                <!-- Having children, we need to render it via list group -->
                <div v-if="link.type == 'label'" class="">
                    <p v-if="appStore.drawerTitlesShow" class="menu-label">
                        {{ t(`dl.${link.name}`) }}
                    </p>
                </div>

                <drawer-item-group v-else-if="link.children" :link="link" :isRail="appStore.drawerTitlesShow" />

                <!-- Not having any children -->
                <drawer-item v-else-if="!link.children && (link.permissions && !can(link.permissions) ? false : true)"
                    :link="link" :isRail="appStore.drawerTitlesShow" />
            </template>
        </v-list>

        <template #append>
            <v-list-item class="text-center px-0">
                <v-btn variant="outlined" class="w-100 justify-space-between" min-height="60"
                    @click="authStore.logOut()">
                    <template #append>
                        <img src="@/assets/images/svg/logout.svg?row" alt="logout image"
                            :class="{ 'rotate-180': locale === 'en' }" />
                    </template>
                    <div class="w-100 d-flex align-center" v-if="appStore.drawerTitlesShow">
                        <!-- <v-avatar :image="authStore.user.avatar ?? avatarImage" width="40" class="order-1"></v-avatar> -->
                        <div class="text-start order-2">
                            <h5>{{ t('buttons.logout') }}</h5>
                            <p class="text-lowercase">{{ authStore.user.email }}</p>
                        </div>
                    </div>
                </v-btn>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script setup>
import avatarImage from '@/assets/images/svg/avatar.svg?row'
import iconLight from '@/assets/images/svg/logo_sm_light.svg?skipsvgo'
import iconDark from '@/assets/images/svg/logo_sm_dark.svg?skipsvgo'
import logoLight from '@/assets/images/svg/logo_light.svg?skipsvgo'
import logoDark from '@/assets/images/svg/logo_dark.svg?skipsvgo'
import navbarIcon from '@/assets/images/svg/circle-dot.svg?component'

import { links } from '@/data/sidebarLinks'

import { computed, watch, ref } from 'vue'
import { useDisplay } from 'vuetify'
import DrawerItem from '@/components/specific/dashboard/Sidebar/Item.vue'
import DrawerItemGroup from '@/components/specific/dashboard/Sidebar/ItemGroup.vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from 'vue-i18n'
import { useIsDark } from '@/composables/useIsDark'
import { storeToRefs } from 'pinia'

const props = defineProps(['isRail'])
const { lgAndUp, smAndDown, mdAndDown, mdAndUp } = useDisplay()
const { t, locale } = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const isDark = useIsDark()
const { properties } = storeToRefs(settingsStore)

watch(
    () => mdAndUp.value,
    (val) => {
        if (val) {
            appStore.drawer = true
        }
    }
)
if (mdAndDown.value) {
    appStore.drawer = false
}
watch(
    () => mdAndDown.value,
    (val) => {
        if (val) {
            appStore.drawerRail = false
            appStore.drawerTitlesShow = true
            appStore.hoverDrawerPrevent = true
        }
    }
)

const openDrawer = () => {
    if (mdAndDown.value) {
        appStore.drawer = !appStore.drawer
    } else {
        appStore.drawerRail = !appStore.drawerRail
        appStore.hoverDrawerPrevent = !appStore.hoverDrawerPrevent
        appStore.drawerTitlesShow = !appStore.drawerTitlesShow
        if (!appStore.drawerRail) {
            appStore.drawerTitlesShow = true
        }
    }
}

const fallbackImage = ref('/no_data.svg?row')


// @TODO computed
const appLogo = computed(() => {

    const logos = {}
    const propertiesObj = {}
    properties.value.forEach((property) => {
        propertiesObj[property.key] = property.value
    })
    const {
        website_dark_logo_large = settingsStore.getProperties?.website_dark_logo_large,
        website_dark_logo_small = settingsStore.getProperties?.website_dark_logo_small,
        website_logo_large = settingsStore.getProperties?.website_logo_large,
        website_logo_small = settingsStore.getProperties?.website_logo_small
    } = propertiesObj
    if (isDark.value) {
        logos['large'] = website_dark_logo_large || logoDark
        logos['small'] = website_dark_logo_small || iconDark
    } else {
        logos['large'] = website_logo_large || logoLight
        logos['small'] = website_logo_small || iconLight
    }

    return logos
})



// @TODO functions
const onError = (key) => {
    appLogo[key] = fallbackImage.value
};

</script>

<style lang="scss" scoped>
.svg-controller svg {
    max-width: 32px;
    max-height: 32px;
}


::v-deep {
    .logo-large {
        // margin-top: 24px;
        display: flex;
        padding-inline-start: 1.375rem;

        svg,
        img {
            width: fit-content;
            max-height: 2rem;
        }
    }

    .v-navigation-drawer--left {
        .v-navigation-drawer__append {
            .v-list-item__append {
                left: -0.938rem;
                right: auto;
            }
        }
    }


}

.v-navigation-drawer::v-deep {
    height: 100svh !important;
    position: fixed !important;
    padding: 1.5rem 0;

    &.v-navigation-drawer--left {
        .v-navigation-drawer__prepend {
            .v-list-item__append {
                right: -0.938rem;
                left: auto;
            }
        }
    }

    &.v-navigation-drawer--right {
        .v-navigation-drawer__prepend {
            .v-list-item__append {
                left: -0.938rem;
                right: auto;
            }
        }
    }

    .v-navigation-drawer__prepend,
    .v-navigation-drawer__append {
        overflow: visible !important;

        .v-list-item__append {
            position: absolute;
            top: .3rem;

            .v-btn {
                border: 1px solid rgba(var(--v-theme-inactiveSubLink), 1);
                background-color: rgba(var(--v-theme-secondary), 1);
                width: 28px;
                height: 28px;
            }
        }
    }

    .v-navigation-drawer__prepend {
        .v-list-item--density-default.v-list-item--one-line {
            min-height: fit-content;
            margin-bottom: .7rem;
        }

        .v-list-item {
            padding: 0;
        }
    }

    .v-navigation-drawer__append {
        .v-list-item__content {
            padding: 0 1.5rem;

            .v-btn {
                display: flex !important;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #D0D5DD;
                padding: .75rem 1rem;
                border-radius: .5rem !important;
                letter-spacing: .0em;
                text-indent: 0em;
                font-size: .875rem;
                font-weight: 500;
                line-height: 1.25rem;
                min-width: auto !important;

                .v-btn__append {
                    margin-inline: 0;
                    justify-content: end;
                }


                h5 {
                    font-size: .875rem;
                    font-weight: 500;
                    line-height: 1.25rem;
                }

                p {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 18px;
                    color: rgba(var(--v-theme-inactiveSubLink), 1);
                }
            }
        }
    }

    .v-list-item--density-default.v-list-item--two-line {
        padding-top: 0;
        padding-bottom: 0;
    }
}

.v-list::v-deep {
    padding: 0 1.5rem;

    .v-list-item--density-comfortable:not(.v-list-item--nav).v-list-item--one-line {
        padding: .625rem .75rem;

    }

    .v-list-item {
        border-radius: .5rem !important;
        margin-bottom: .5rem;

        &.v-list-item--active {
            background-color: rgba(var(--v-theme-primary), 1);
            border-inline-start: 3px solid rgba(var(--v-theme-white), 1);

            .v-list-item__content {
                span {
                    font-weight: 700;
                }
            }

            &>.v-list-item__overlay {
                opacity: 0;
            }

        }

        // &:hover {
        //     & >.v-list-item__overlay {
        //         opacity: 1;
        //         background-color: rgba(var(--v-theme-primary), 1)
        //     }
        // }
        .v-list-item__prepend,
        .v-list-item__append {
            img {
                max-width: 20px;
                max-height: 20px;
                filter: brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(3511%) hue-rotate(29deg) brightness(119%) contrast(101%);
            }
        }

        .v-list-item__content {
            margin-inline-start: 12px;

            span {
                font-size: .875rem;
                font-weight: 500;
                line-height: 1.25rem;
                letter-spacing: -0.28px;
            }
        }

    }

    .v-list-group__items {

        .sub_link {
            color: rgba(var(--v-theme-inactiveSubLink), 1);
        }

        .v-list-item__prepend {
            filter: brightness(0) saturate(100%) invert(78%) sepia(8%) saturate(500%) hue-rotate(192deg) brightness(82%) contrast(85%);

            .icon {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: rgba(var(--v-theme-primary), 1);
            }
        }

        .v-list-item.v-list-item--active {
            .sub_link {
                color: rgba(var(--v-theme-white), 1);
            }

            .v-list-item__prepend {
                filter: brightness(0) saturate(100%) invert(70%) sepia(27%) saturate(6755%) hue-rotate(165deg) brightness(94%) contrast(87%);
            }

            background-color: rgba(var(--v-theme-wite), 1);
        }

        &>.v-list-item:not(:last-child) {
            position: relative;
            padding-inline-start: 20px !important;

            &::before {
                position: absolute;
                content: '';
                width: 1px;
                height: 100%;
                background-color: rgba(var(--v-theme-iconLine), 1);
                right: 23.4px;
                top: 60%;
            }
        }

        .v-list-item:last-child {
            padding-inline-start: 20px !important;
        }

        .v-list-item {
            &.v-list-item--active {
                background-color: rgba(var(--v-theme-transparent), 1);
                border-inline-start: none;

                &>.v-list-item__overlay {
                    opacity: 0;
                }
            }
        }
    }

}

.menu-label {
    font-size: .75rem;
    font-weight: 500;
    line-height: .75rem;
    color: rgba(var(--v-theme-inactiveSubLink), 1);
    text-transform: uppercase;
    margin-top: 1.5rem;
    margin-bottom: .75rem;
    margin-inline: .75rem;
}
</style>
