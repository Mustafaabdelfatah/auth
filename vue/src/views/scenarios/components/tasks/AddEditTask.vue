<template>
    <ASideDialog DialogType="add" v-model="dialog" :addButton="true">
        <template #open-dialog-btn>
            {{ t('buttons.add_new_task') }}
        </template>
        <template #title>
            <h5 class="_card-title">
                {{ appStore.isCreate ? t('buttons.add_new_task') : t('buttons.edit_new_task') }}
            </h5>
        </template>
        <template #content>
            <steppers :steps="steps" :currentStep="step" :hideHeaders="false" :hideActions="true">
                <template #TemplatesHandler>
                    <TemplatesExpansionPanel class="pb-3" @next="next" @closeModal="dialog = false" />
                </template>
                <template #TaskInformation>
                    <TaskInformation @next="next" @previous="prev" />
                </template>
                <template #TasksHandler>
                    <div class="d-flex flex-column ga-4 h-100">
                        <TaskInput @next="next" @previous="prev" @deleteTask="deleteTask"
                            v-for="singleTask in TaskInfo.task_points" :key="singleTask.id" :task_points="singleTask"
                            :users="TaskInfo.userIds" />
                    </div>
                    <div class="d-flex align-center justify-end ga-3 w-100 pt-5 border-t-thin pb-0">
                        <v-btn @click="prev" v-ripple="{ class: `text-secondary` }"
                            class="d-flex border-thin px-5 text-white border-secondary bg-secondary" rounded="6px"
                            border="opacity-50" height="42" type="button">
                            {{ t('buttons.previous') }}
                        </v-btn>
                        <v-btn @click="submitForm" type="button" v-ripple="{ class: `text-secondary` }"
                            class="d-flex border-thin px-5 text-white border-primary bg-primary" rounded="6px"
                            border="opacity-50" height="42" :loading="appStore.buttonLoading">
                            {{ appStore.isCreate ? t('buttons.add') : t('buttons.edit') }}
                        </v-btn>
                    </div>
                </template>
            </steppers>
        </template>
    </ASideDialog>
    <ConfirmationDialog @deleted="TaskDeletedAction" DialogType="unconfirm" v-model="deleteModal"
        :title="deleteTaskPoint.translation_name"></ConfirmationDialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import ASideDialog from '@/components/common/Dialogs/ASideDialog.vue'
import steppers from '@/components/common/steppers/index.vue'
import TaskInput from '@/views/scenarios/components/tasks/TaskInput.vue'
import TemplatesExpansionPanel from '@/views/scenarios/components/tasks/TemplatesExpansionPanel.vue'
import TaskInformation from '@/views/scenarios/components/tasks/TaskInformation.vue'
import ConfirmationDialog from '@/components/common/Dialogs/ConfirmationDialog.vue'
import { createLogicTask, updateLogicTask } from '@/services/apis/logic-task'
import { flattenObject } from '@/utils/flattenObject';
import { useRoute } from 'vue-router';
const route = useRoute();
const TaskId = route.params.id;


import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useTaskLogics } from '@/stores/task-logics'
const taskLogics = useTaskLogics()

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

// =====(  Data )====== //
const dialog = ref(false)
const deleteModal = ref(false)
const deleteTaskPoint = ref('')
const TaskInfo = ref('')

const step = ref(1)
const steps = ref([
    { id: 1, key: 'TemplatesHandler', title: t('dl.select-template') },
    { id: 2, key: 'TaskInformation', title: t('dl.task-info') },
    { id: 3, key: 'TasksHandler', title: t('dl.sub-tasks') }
])

// =====(  Emits & Models )====== //
const openDialog = defineModel()


const emit = defineEmits(['scenarioAdded', 'scenarioEdited'])

// =====(  Functions )====== //

const next = async (data) => {
    TaskInfo.value = data
    if (
        steps.value.length > appStore.step &&
        (taskLogics.templateID != null ||
            taskLogics.taskInfo != null ||
            taskLogics.task_points != null)
    ) {
        appStore.step++
    }
}

const prev = async () => {
    if (steps.value.length >= appStore.step) {
        appStore.step--
    }
}

const deleteTask = async (data) => {
    deleteModal.value = true
    deleteTaskPoint.value = data
}

const TaskDeletedAction = async () => {
    const index = deleteTaskPoint.value.id
    TaskInfo.value.task_points = TaskInfo.value.task_points.filter((item) => item.id !== index)
    deleteModal.value = false
}

// Save
const save = async () => {
    appStore.buttonLoading = true
    const FormData = {
        parent_id: taskLogics.parentID,
        template_id: taskLogics.templateID,
        deadline: "2024-08-27 16:44:30",
        priority_level: 1,
        department_id: taskLogics.taskInfo.department_id,
        name: taskLogics.taskInfo.name,
        description: taskLogics.taskInfo.description,
        task_points: {
            ...taskLogics.task_points,
        }
    }

    await createLogicTask(TaskId, FormData)
    appStore.buttonLoading = false
    emit('scenarioAdded')
    dialog.value = false
}

// Edit
const edit = async (data) => {
    appStore.buttonLoading = true
    const taskId = props.task.id
    const form = (data)
    await updateLogicTask(taskId, form)
    appStore.buttonLoading = false
    emit('scenarioEdited')
    dialog.value = false
}

const submitForm = async (data) => {
    if (appStore.isCreate) {
        await save(data)
    } else {
        await edit(data)
    }
}

watch(dialog, (newValue, oldValue) => {
    if (newValue == false) {
        appStore.isCreate = true
    } else {
    }
})

watch(openDialog, (newValue, oldValue) => {
    if (newValue == true) {
        dialog.value = newValue
    } else {
        dialog.value = true
    }
    // appStore.isCreate = true
});


</script>

<style lang="scss" scoped>
::v-deep {
    .v-card-text {
        display: flex;
    }

    .v-stepper-window {
        margin: 0;
    }
}

::v-deep.v-sheet {
    height: 100%;
    box-shadow: none !important;

    .v-stepper-header {
        box-shadow: none !important;

        .v-stepper-item {
            padding: 0;
            flex-basis: auto;

            .v-avatar {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(var(--v-theme-text), 1);
            }

            &.v-stepper-item--selected {

                .v-stepper-item__avatar.v-avatar,
                .v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
                    background: rgba(var(--v-theme-primary), 1);
                }
            }
        }

        .v-stepper--alt-labels {}
    }

    .v-window {
        height: 92%;

        .v-window__container {
            height: 99%;

            .v-window-item {
                height: 100%;
                display: flex;
                flex-direction: column;

                .v-expansion-panels {
                    // flex: 1 auto;
                    height: 100%;
                    align-content: flex-start;
                    overflow-y: auto;
                    padding-bottom: 1.5rem;

                    .v-expansion-panel {
                        height: fit-content;
                    }
                }
            }
        }
    }

    .v-stepper-actions {
        padding: 0;
        justify-content: flex-end;
        gap: 1.25rem;

        .v-btn {
            background-color: rgba(var(--v-theme-secondary), 1);
            color: rgba(var(--v-theme-white), 1);
            border-radius: 0.625rem;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.5rem;
            letter-spacing: 0.019;
        }
    }
}

.card-padding::v-deep {
    overflow-y: hidden;
}

._card-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.875rem;
    margin-bottom: 0;
}

h3 {
    &.text {
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.371rem;
        letter-spacing: 0.004rem;
    }
}

.v-avatar.v-avatar--size-default {
    --v-avatar-height: 3.125rem;
}
</style>
