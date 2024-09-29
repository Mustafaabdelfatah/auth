<template>
    <v-expansion-panels flat :ripple="false" v-model="openPanel">
        <v-expansion-panel v-for="item in panels" :key="item.key" :value="item.key" :ripple="false">
            <v-expansion-panel-title :ripple="false">
                <slot :name="`title-${item.key}`"></slot>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <slot :name="`content-${item.key}`"></slot>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-skeleton-loader v-if="loading" elevation="text" rounded="4" max-width="100%"
        type="table-heading, list-item-two-line"></v-skeleton-loader>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();


const props = defineProps({
    // panels: Array,
    // taskTitle: String,
    // taskTime: String,
    // mailTitle: String,
    // mailSubTitle: String,
    loading: {
        type: Boolean,
        default: false,
    }
});

const panels = defineModel('panels');
const openPanel = defineModel('openPanel');

// watch(
//     () => openPanel,
//     (newVal) => {
//         console.log('panels--->', newVal.value);
//     },
//     { deep: true }
// )


</script>

<style lang="scss" scoped>
.connection-point {
    width: .9rem;
    height: .9rem;
    // background-color: rgba(var(--v-theme-primary), 1);

    &.vue-flow__handle-right {
        right: -.375rem;
    }

    &.vue-flow__handle-left {
        left: -.375rem;
    }

    &.vue-flow__handle-bottom {
        bottom: -.375rem;
    }
}

.v-expansion-panels:not(.v-expansion-panels--variant-accordion) > :first-child:not(:last-child):not(.v-expansion-panel--active):not(.v-expansion-panel--before-active) {
    border-bottom-left-radius: 0.625rem !important;
    border-bottom-right-radius: 0.625rem !important;
}

.v-expansion-panels:not(.v-expansion-panels--variant-accordion) > :last-child:not(:first-child):not(.v-expansion-panel--active):not(.v-expansion-panel--after-active) {
    border-top-left-radius: 0.625rem !important;
    border-top-right-radius: 0.625rem !important;
}
.v-expansion-panels::v-deep {
    max-width: 100%;
    min-width: 100%;
    gap: .5rem;


    .v-ripple__animation--in {
        transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1), opacity 0.1s cubic-bezier(0, 0, 0.2, 1);
        opacity: calc(0.25* var(4)) !important;
    }

    .v-expansion-panel-title {
        padding: 1rem 1.188rem;
        // background-color: rgba(var(--v-theme-flowBgColor), 1);
        min-height: 7.125rem;

        h6 {
            font-size: 1.5rem;
            font-weight: 700;
            line-height: .941rem;
            margin-bottom: .363rem;
            color: rgba(var(--v-theme-flowIconTextColor), 1);
        }

        span {
            font-size: .8rem;
            font-weight: 400;
            line-height: .664rem;
            color: rgba(var(--v-theme-text), 1);
        }



        // .v-expansion-panel-title__icon {
        //     color: rgba(var(--v-theme-white), 1);
        //     background-color: rgba(var(--v-theme-flowIconBgColor), 1);
        //     width: 1.5rem;
        //     height: 1.5rem;
        //     align-items: center;
        //     justify-content: center;
        //     border-radius: .375rem;

        //     .v-icon {
        //         --v-icon-size-multiplier: 1.3;
        //     }
        // }
    }

    .v-expansion-panel {
        border-radius: .625rem;
        border: 1px solid rgba(var(--v-theme-cardBorder), 1);
    }

    .v-expansion-panel-text {
        overflow: hidden;


        .body {
            padding: 1rem 1.188rem .336rem 1.188rem;
        }

        .actions {
            .v-btn {
                color: rgba(var(--v-theme-white), 1);
                background-color: rgba(var(--v-theme-flowIconTextColor), 1);
                border-radius: 0 0 .363rem .363rem !important;
                font-weight: 700;
                font-size: .625rem;
                line-height: .953rem;
                max-height: 2.188rem;
            }
        }

        .custom-title {
            font-weight: 700;
            font-size: .625rem;
            line-height: .806rem;
            margin-bottom: .363rem;
            color: rgba(var(--v-theme-flowIconTextColor), 1);
        }

        .mail-section {
            border-bottom: 1px solid rgba(var(--v-theme-flowIconBorderColor), 1);
            padding-bottom: .363rem;
            margin-bottom: .363rem;

            p {
                font-weight: 300;
                font-size: .625rem;
                line-height: .806rem;
            }
        }

        .sub-scenarios {
            font-weight: 400;
            font-size: .5rem;
            line-height: 1.089rem;

            .scenarios-list {

                & > *:not(:last-child) {
                    margin-bottom: .363rem;
                }

                li {
                    display: flex;
                    gap: .25rem;
                    background-color: rgba(var(--v-theme-flowTaskBg), 1);
                    border-radius: .5rem;
                    padding: .313rem .625rem;


                    .number {
                        width: 1.125rem;
                        height: 1.125rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: rgba(var(--v-theme-white), 1);
                        background-color: rgba(var(--v-theme-flowIconBgColor), 1);

                    }
                    .text {
                        flex: 1;
                    }
                }

            }

        }

        .v-expansion-panel-text__wrapper {
            padding: .625rem 1.406rem 1.406rem 1.406rem;
        }
    }
}

.v-skeleton-loader::v-deep {
    border-radius: .625rem;
}
</style>
