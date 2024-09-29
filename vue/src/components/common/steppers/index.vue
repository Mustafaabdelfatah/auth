<template>
    <v-stepper v-model="appStore.step" editable mobile non-linear alt-labels>
        <template v-slot:default="{ prev, next }">
            <v-stepper-header v-if="!hideHeaders">
                <template v-for="item in steps" :key="item.key">
                    <v-stepper-item :title="item?.title" :subtitle="item?.subtitle" :value="item.id"
                        :complete="currentStep > item.id"></v-stepper-item>
                </template>
            </v-stepper-header>
            <!-- <v-divider></v-divider> -->
            <v-stepper-window class="mx-0">
                <v-stepper-window-item v-for="item in steps" :key="item.id" :value="item.id">
                    <h4 class="mt-2 mb-2">
                        {{ item.title }}
                    </h4>
                    <slot :name="item.key" />
                </v-stepper-window-item>
            </v-stepper-window>
            <v-stepper-actions v-if="!hideActions">
                <template #prev>
                    <v-btn type="close" @click="prev">
                        {{ t('buttons.previous') }}
                    </v-btn>
                </template>
                <template #next>
                    <v-btn @click="next" >
                        {{ t('buttons.next') }}
                    </v-btn>
                </template>
            </v-stepper-actions>
        </template>
    </v-stepper>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const step = ref(0)

const props = defineProps({
    steps: {
        type: Array,
        required: true
    },
    hideHeaders: {
        type: Boolean,
        default: false
    },
    hideActions: {
        type: Boolean,
        default: false
    },
    currentStep: {
        type: Number,
        default: 0
    }
})

// Update local step when prop changes
watch(
    () => props.currentStep,
    (newStep) => {
        step.value = newStep
        // console.log('step.value',step.value);
    }
);
</script>

<style lang="scss" scoped>
// .v-sheet::v-deep {
//     height: 100%;
//     box-shadow: none !important;
//     .v-stepper-header {
//         box-shadow: none !important;
//         .v-stepper-item {
//             padding: 0;
//             flex-basis: auto;

//             .v-avatar {
//                 margin: 0;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 background: rgba(var(--v-theme-text), 1);
//             }

//             &.v-stepper-item--selected {
//                 .v-stepper-item__avatar.v-avatar, .v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
//                     background: rgba(var(--v-theme-primary), 1);
//                 }
//             }
//         }
//         .v-stepper--alt-labels {
//         }
//     }

//     .v-window {
//         height: 100%;

//         .v-window__container {
//             height: 100%;

//             .v-window-item {
//                 height: 93%;
//                 display: flex;
//                 flex-direction: column;

//                 .v-expansion-panels {
//                     // flex: 1 auto;
//                     height: 100%;
//                     align-content: flex-start;
//                     overflow-y: auto;
//                     padding-bottom: 1.5rem;

//                     .v-expansion-panel {
//                         height: fit-content;
//                     }
//                 }
//             }
//         }
//     }

//     .v-stepper-actions {
//         padding: 0;
//         justify-content: flex-end;
//         gap: 1.25rem;
//         .v-btn {
//             background-color: rgba(var(--v-theme-secondary), 1);
//             color: rgba(var(--v-theme-white), 1);
//             border-radius: .625rem;
//             font-size: 1rem;
//             font-weight: 700;
//             line-height: 1.5rem;
//             letter-spacing: .019;
//         }
//     }
// }
</style>
