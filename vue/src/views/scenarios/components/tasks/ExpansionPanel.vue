<template>
    <v-expansion-panels flat :ripple="false">
        <v-expansion-panel :ripple="false">
            <v-expansion-panel-title :ripple="false">
                <div class="d-flex flex-column ga-2">
                    <h6>
                        {{ task.name }}
                    </h6>
                    <span v-if="taskTime" class="d-flex ga-1">
                        <timeIcon></timeIcon>
                        <span>
                            {{ taskTime }}
                        </span>
                    </span>
                </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <div class="body">
                    <div class="mail-section" :class="{ 'pb-3 mb-4': subScenarios.length !== 0 }"
                        :style="{ 'border-bottom': subScenarios.length === 0 ? 'none' : '' }">
                        <h5 class="custom-title">
                            {{ task.template.name }}
                        </h5>
                        <div v-html="task.template.description">
                        </div>
                    </div>

                    <div class="sub-scenarios" v-if="!subScenarios.length == 0">
                        <h5 class="custom-title">
                            {{ t('dl.sub_scenarios') }}
                        </h5>

                        <ul class="scenarios-list">
                            <li v-for="(subScenario, index) in subScenarios" :key="subScenario.id">
                                <div class="number">
                                    {{ index + 1 }}
                                </div>
                                <span class="text">
                                    {{ subScenario.title }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="actions">
                    <v-btn class="details-btn w-75 bg-secondary" variant="text" flat @click="showDetails">
                        {{ t('buttons.show_details') }}
                    </v-btn>
                    <div class="d-flex w-25">
                        <v-btn class="edit-btn w-50 bg-primary rounded-0" size="small" :icon="edit" flat
                            @click="editChild(task)"></v-btn>
                        <v-btn class="delete-btn w-50 bg-error rounded-0" size="small" :icon="trash" flat
                            @click="deleteTask({ id: task.id, transition_name: task.name })"></v-btn>
                    </div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-skeleton-loader v-if="loading" elevation="text" rounded="4" max-width="13.063rem"
        type="table-heading, list-item-two-line"></v-skeleton-loader>

    <Handle id="top" class="connection-point" type="target" :position="Position.Top" />
    <Handle id="bottom" class="connection-point" type="source" :position="Position.Bottom" />
    <v-btn @click="addChild(task.id)" class="add-button" :icon="plus" variant="outlined" height="26" width="26"
        size="small"></v-btn>
</template>

<script setup>
import timeIcon from '@/assets/images/svg/time.svg'
import plus from '@/assets/images/svg/plus.svg'
import trash from '@/assets/images/svg/trash-icon.svg'
import edit from '@/assets/images/svg/edit-icon.svg'

import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { VueFlow, Panel, useVueFlow, MarkerType, Handle, Position, BezierEdge, getBezierPath } from '@vue-flow/core'
import { NumberFormat, useI18n } from 'vue-i18n'
const { t } = useI18n();

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()


const props = defineProps({
    subScenarios: {
        type: Array,
        default: []
    },
    taskTitle: String,
    taskTime: String,
    mailTitle: String,
    mailSubTitle: String,
    id: Number,
    task: Object,
    loading: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(['seeDetails', 'openAddModal', 'openEditModal', 'openDeleteModal']);

const showDetails = async () => {
    emit('seeDetails');
};

const addChild = async (parentID) => {
    emit('openAddModal', parentID);
};

const editChild = async (task) => {
    emit('openEditModal', task);
};

const deleteTask = async (parentID) => {
    emit('openDeleteModal', parentID);
};

</script>

<style lang="scss" scoped>
.add-button::v-deep {

    &.v-btn {
        border-color: rgba(var(--v-theme-addBtnTask), 1) !important;

        .v-btn__content {

            .v-icon {
                svg {
                    fill: rgba(var(--v-theme-addBtnTask), 1) !important;
                }
            }
        }
    }
}

.connection-point {
    width: .9rem;
    height: .9rem;
    background-color: rgba(var(--v-theme-primary), 1);

    &.vue-flow__handle-right {
        right: -.375rem;
    }

    &.vue-flow__handle-left {
        left: -.375rem;
    }

    &.vue-flow__handle-top {
        top: -.375rem;
    }

    &.vue-flow__handle-bottom {
        bottom: -.375rem;
    }
}

.v-expansion-panels::v-deep {
    max-width: 15rem;
    min-width: 15rem;

    .v-ripple__animation--in {
        transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1), opacity 0.1s cubic-bezier(0, 0, 0.2, 1);
        opacity: calc(0.25* var(4)) !important;
    }

    .v-expansion-panel-title {
        padding: 1rem 1.188rem;
        background-color: rgba(var(--v-theme-flowBgColor), 1);
        min-height: 3.5rem;

        h6 {
            font-size: .771rem;
            font-weight: 700;
            line-height: .941rem;
            // margin-bottom: .363rem;
            color: rgba(var(--v-theme-flowIconTextColor), 1);
        }

        span {
            font-size: .544rem;
            font-weight: 400;
            line-height: .664rem;
            color: rgba(var(--v-theme-text), 1);
        }



        .v-expansion-panel-title__icon {
            color: rgba(var(--v-theme-white), 1);
            background-color: rgba(var(--v-theme-flowIconBgColor), 1);
            width: 1.5rem;
            height: 1.5rem;
            align-items: center;
            justify-content: center;
            border-radius: .375rem;

            .v-icon {
                --v-icon-size-multiplier: 1.3;
            }
        }
    }

    .v-expansion-panel {
        border-radius: .625rem;
    }

    .v-expansion-panel-text {
        overflow: hidden;


        .body {
            padding: 1rem 1.188rem .336rem 1.188rem;
        }

        .actions {
            display: flex;

            .v-btn {
                font-weight: 700;
                font-size: .625rem;
                line-height: .953rem;
                max-height: 2.188rem;
                border-radius: 0;

                .v-btn__content {
                    width: 100% !important;
                }

                .v-icon {
                    width: 100%;
                    height: 100%;
                    --v-icon-size-multiplier: 1;

                }

                &.delete-btn {
                    border-radius: 0 0 .363rem 0 !important;

                    .v-icon {
                        transform: scale(.9);

                        svg {
                            path {
                                stroke: rgba(var(--v-theme-white), 1);
                            }
                        }
                    }
                }

                &.edit-btn {

                    // color: rgba(var(--v-theme-white), 1);
                    .v-icon {
                        transform: scale(.8);

                        svg {
                            fill: rgba(var(--v-theme-white), 1);

                            path {
                                // stroke: rgba(var(--v-theme-white), 1);
                            }
                        }
                    }
                }

                &.details-btn {
                    color: rgba(var(--v-theme-white), 1);
                    // background-color: rgba(var(--v-theme-flowIconTextColor), 1);
                    border-radius: 0 0 0 .363rem !important;
                }
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

                &>*:not(:last-child) {
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
                        border-radius: 3rem;

                    }

                    .text {
                        flex: 1;
                    }
                }

            }

        }

        .v-expansion-panel-text__wrapper {
            padding: 0;
        }
    }
}

.v-skeleton-loader::v-deep {
    border-radius: .625rem;
}
</style>
