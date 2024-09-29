<template>
    <v-list-group color="secondary" rounded :value="link.name" fluid class="mb-1 list-group--custom" :collapse-icon="appStore.drawerTitlesShow? 'mdi-chevron-up' : ''" :expand-icon="appStore.drawerTitlesShow? 'mdi-chevron-down' : ''">
        <template #activator="{ props }">
            <v-list-item rounded v-bind="props">
                <template #prepend>
                    <img :src="getIconComponent(link.name)" alt="" />
                    <span class="ms-2 sub_link" v-if="isRail">{{ t(`dl.${link.name}`) }}</span>
                </template>
                <template #append v-if="false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        class="text-grey-darken-2" stroke="currentColor" width="18">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </template>
            </v-list-item>
        </template>

        <v-list-item v-show="isRail" v-for="child in link.children" :key="child.name" link :value="child.name"
            :to="child.to" rounded>
            <v-list-item-title class="sub_link">{{ t(`dl.${child.name}`) }}</v-list-item-title>
            <template v-slot:prepend>
                <span class="icon"></span>
            </template>
        </v-list-item>
    </v-list-group>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import settings from '@/assets/images/svg/settings.svg?row'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
// appStore.drawerTitlesShow

defineProps({ link: Object, isRail: Boolean })

const { t } = useI18n()
const route = useRoute()

const iconComponents = {
    settings
}

const getIconComponent = (name) => {
    return iconComponents[name] || null
};
</script>
<style lang="scss" scoped>
// .sub_child_link {
//     font-size: 13px;
//     font-weight: 600;
// }

// .list-group--custom {
//     .v-list-group__items {
//         .v-list-item {
//             &:first-child {
//                 margin-top: 8px;
//             }
//         }
//     }

//     .v-list-group__header.v-list-item--active:not(:focus-visible) {
//         background: rgba(var(--v-theme-primary), 1);

//         .v-list-item__overlay {
//             opacity: 0.05 !important;
//         }
//     }
// }

// .v-list-item {
//     color: rgba(var(--v-theme-sideItem), 1);
//     transition: 0.4s;

//     img {
//         transition: 0.4s;
//         filter: brightness(0) saturate(100%) invert(44%) sepia(13%) saturate(447%) hue-rotate(213deg) brightness(92%) contrast(88%);
//     }

//     .icon {
//         width: 10px;
//         height: 10px;
//         display: flex;
//         border: 2px solid rgba(var(--v-theme-primary), 1);
//         border-radius: 50%;
//         position: relative;

//         &::before {
//             content: '';
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             width: 4px;
//             height: 4px;
//             border-radius: 50%;
//             transform: translate(-50%, -50%);
//         }
//     }

//     &--active {
//         color: rgba(var(--v-theme-sideItem), 1);

//         img {
//             filter: brightness(0) invert(1);
//         }

//         i {
//             color: #fff;
//         }
//     }
// }

// .v-list-group {
//     >.v-list-item {
//         &--active {
//             color: rgba(var(--v-theme-white), 1);
//         }
//     }

//     &__items {
//         background-color: rgba(var(--v-theme-text), 1);

//         .v-list-item {
//             font-weight: 400;
//             color: rgba(var(--v-theme-sideItem), 1);
//         }

//         .v-list-item--active {
//             color: rgba(var(--v-theme-primary), 1);
//             font-weight: 700;

//             ::v-deep {
//                 .icon {
//                     border: 2px solid rgba(var(--v-theme-primary), 1);

//                     &::before {
//                         background-color: rgba(var(--v-theme-primary, 1));
//                     }
//                 }
//             }
//         }
//     }
// }
</style>
