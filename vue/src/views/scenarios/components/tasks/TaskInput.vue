<template>
    <v-card class="" border flat variant="text" ripple elevation="0">
        <v-list-item class="pa-0" height="60">
            <template v-slot:prepend>
                <h4>
                    {{ task_points.translation_name }}
                </h4>
            </template>

            <template v-slot:append>
                <div class="d-flex align-center ga-2">
                    <Menu :items="users" :iconBtn="true" strategy="single-leaf" v-model="selected">
                        <template #activator>
                            <!-- <v-avatar class="me-1" size="30" v-if="selected[0].avatar != null" :image="selected[0].avatar"></v-avatar> -->
                            <addUser />
                        </template>
                    </Menu>
                    <DateTimePicker v-model="date">
                        <template #trigger>
                            <v-btn class="text-none w-auto h-auto" icon variant="text" rounded="1">
                                <timer />
                                <!-- <div class="custom-text" v-if="task.deadline">
                                        {{ useNumConverter(moment(task.deadline).format('D MMMM YYYY')) }}
                                    </div> -->
                            </v-btn>
                        </template>
                    </DateTimePicker>
                    <v-btn @click="deleteModal(task_points)" class="text-none w-auto h-auto" icon variant="text"
                        rounded="1">
                        <trashIcon />
                    </v-btn>
                </div>
            </template>
        </v-list-item>
    </v-card>
</template>

<script setup>
import moment from 'moment'
import { arEG, enUS } from 'date-fns/locale';
import addUser from '@/assets/images/svg/add-user.svg'
import timer from '@/assets/images/svg/timer.svg'
import trashIcon from '@/assets/images/svg/trash-icon.svg'
import DateTimePicker from '@/components/common/DateTimePicker/index.vue';
import Menu from '@/components/common/Menu/index.vue';
import { useNumConverter } from '@/composables/useNumConverter.js'
import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

import { useTaskLogics } from '@/stores/task-logics'
const templateStatus = useTaskLogics()


import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue'


const date = ref('');
const dateFormatted = ref('');

const props = defineProps({
    task_points: {
        type: Object,
    },
    users: {
        type: Object,
    }
})

const selected = ref(null);

const task = ref(
    {
        id: props.task_points.id,
        name: props.task_points.translation_name,
        details: "Details for Task 1",
        user_id: '',
        deadline: ''
    }
);

const emit = defineEmits(['deleteTask']);

const deleteModal = (data) => {
    emit('deleteTask', data)
}

// const next = async (data) => {
//     const payload = transformSchemaToObject(data)
//     templateStatus.taskInfo = payload
//     emit('next', payload)
// }

// const prev = async () => {
//     updateSchemaValues(schema.value, templateStatus.taskInfo)
//     emit('previous')
// }


watch(date, (newValue, oldValue) => {
    task.value.deadline = moment(newValue).format(`YYYY-MM-DD HH:mm:ss`)
});


watch(selected, (newValue, oldValue) => {
    task.value.user_id = Number(newValue[0].id)
});


watch(
    () => task.value,
    (newValue, oldValue) => {
        const index = templateStatus.task_points.findIndex(t => t.id === newValue.id);
        if (index !== -1) {
            templateStatus.task_points.splice(index, 1);
        }
        templateStatus.task_points.push(newValue);
    },
    { deep: true }
);

</script>

<style lang="scss" scoped>
.v-card {
    border-radius: .625rem;
    padding-inline: 1.25rem;

    h4 {
        font-size: .875rem;
        font-weight: 500;
        line-height: 1.4rem;
    }
}

.custom-text {
    font-size: .625rem;
    font-weight: 400;
    line-height: 1rem;
    margin-inline-start: .3rem;

}
</style>
