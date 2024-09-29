<template>
    <ASideDialog DialogType="add" v-model="dialog" :addButton="true">
        <template #open-dialog-btn>
            {{ t('buttons.add_new_department') }}
        </template>
        <template #title>
            <h5 class="_card-title">
                {{ isCreate ? t('buttons.add_new_department') : t('buttons.edit_new_department') }}
            </h5>
        </template>
        <template #content>
            <GenericForm @submit="submitForm" :schema="schema" :props-to-watch="[]" class="pb-10">
                <template #tasks>
                    <div>
                        <div class="d-flex align-center justify-space-between mb-4">
                            <div class="field-label pa-0">
                                <h3>{{ t('headings.add_task') }}</h3>
                            </div>
                            <v-btn icon="mdi:mdi-plus" variant="tonal" base-color="primary" density="compact"
                                @click="addTask"></v-btn>
                        </div>
                        <div v-for="(task, index) in tasks" :key="index" class="mb-4 border-bottom">
                        {{ task.id }}
                            <textInput :label="`${t('headings.task_ar')}`" required v-model="task.name.ar"
                                :placeholder="`${t('headings.task_ar')}`"></textInput>
                            <textInput class="mt-5" :label="`${t('headings.task_en')}`" required v-model="task.name.en"
                                :placeholder="`${t('headings.task_en')}`"></textInput>
                            <div class="delete-btn d-flex align-center justify-center w-100 mt-4">
                                <v-btn icon="mdi:mdi-trash-can-outline" variant="tonal" base-color="error"
                                    density="compact" @click="removeTask(index)"></v-btn>
                            </div>
                        </div>
                    </div>
                </template>

                <template #submit>
                    <div class="d-flex align-center justify-end ga-3 w-100 actions-shadow">
                        <v-btn @click="dialog = false" class="d-flex border-thin px-5 border-error bg-error"
                            rounded="8" border="opacity-50" height="42">
                            {{ t('buttons.cancel') }}
                        </v-btn>
                        <v-btn v-ripple="{ class: `text-secondary` }"
                            class="d-flex border-thin px-5 text-white  border-secondary bg-secondary" rounded="8"
                            border="opacity-50" height="42" type="submit" :loading="appStore.buttonLoading">
                            {{ isCreate ? t('buttons.add') : t('buttons.edit') }}
                        </v-btn>
                    </div>
                </template>
            </GenericForm>
        </template>
    </ASideDialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue'
import ASideDialog from '@/components/common/Dialogs/ASideDialog.vue'
import textInput from '@/components/common/FieldsTypes/textInput.vue'
import GenericForm from '@/components/common/GenericForm/index.vue'
import { createDepartment, updateDepartment, getDepartmentsById } from '@/services/apis/departments'
import { getGenerals } from '@/services/apis/general'
import { getSectors, deleteSector } from '@/services/apis/sectors.js'
import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'
import { useUsersStore } from '@/stores/users'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const usersStore = useUsersStore()

import { useAppStore } from '@/stores/app'
const appStore = useAppStore();

const queryParams = {
    tables: [
        { name: 'departments' }
    ]
};

const { departments } = await getGenerals(queryParams);


// =====(  Data )====== //
const dialog = ref(false)
const isCreate = ref(true)
// const sectors = ref(null);
const sectors = ref(null);
const tasks = ref([
    {
        name:{
            en: '',
            ar: ''
        }
    }
])


const addTask = () => {
    const task = {
        name: {
            ar: '',
            en: ''
        }
    }
    tasks.value.push(task)
};

const removeTask = (index) => {
    tasks.value.splice(index, 1);
};

const props = defineProps({
    department: {
        type: Object,
    },
});

// =====(  Emits & Models )====== //
const openDialog = defineModel()
const emit = defineEmits(['departmentAdded'])


// =====(  Functions )====== //

// Save
const save = async (data) => {
    appStore.buttonLoading = true
    const form = transformSchemaToObject(data)
    form['tasks'] = tasks.value
    await createDepartment(form)
    appStore.buttonLoading = false
    emit('departmentAdded');
    dialog.value = false;
};

// Edit
const edit = async (data) => {
    appStore.buttonLoading = true
    const departmentId = props.department.id;
    const form = transformSchemaToObject(data)
    form['tasks'] = tasks.value
    await updateDepartment(departmentId, form)
    appStore.buttonLoading = false
    emit('departmentEdited');
    dialog.value = false;
};


const submitForm = async (data) => {
    if (isCreate.value) {
        await save(data)
    }
    else {
        await edit(data)
    }
}

const returnData = async () => {
    const data = {
        name: {
            ...props.department.name,
        },
        description: {
            ...props.department.description,
        },
        // parent_id: props.department.id,
        manager_id: props.department.manager.id,
        section_id: props.department.section.id,
        tasks: props.department.section.id
    }
    const dataFetch = await getDepartmentsById(props.department.id)
    console.log('Edit Data ==>', dataFetch);

    updateSchemaValues(schema.value, data)
}



watch(props, (newValue, oldValue) => {
    // console.log('newValue', newValue.department);
    returnData()
});


await usersStore.getUsers()


const fetchSectors = async () => {
    const data = await getSectors();
    sectors.value = data;
};

await fetchSectors();


const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name.ar',
        label: t('headings.department_name_ar'),
        placeholder: t('headings.department_name_ar'),
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.NAME'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 1,
        type: 'textarea',
        key: 'description.ar',
        label: t('headings.department_description_ar'),
        placeholder: t('headings.department_description_ar'),
        value: null,
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.DESCRIPTION'),
        // ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 2,
        type: 'text',
        key: 'name.en',
        label: t('headings.department_name_en'),
        placeholder: t('headings.department_name_en'),
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.NAME'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 3,
        type: 'textarea',
        key: 'description.en',
        label: t('headings.department_description_en'),
        placeholder: t('headings.department_description_en'),
        value: null,
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.DESCRIPTION'),
        // ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 4,
        type: 'selectBox',
        key: 'parent_id',
        label: t('headings.main_department'),
        placeholder: t('headings.main_department'),
        options: departments,
        itemTitle: 'name',
        itemValue: 'id',
        value: null,
        required: false,
        rules: [

        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 5,
        type: 'selectBox',
        key: 'manager_id',
        label: t('headings.manager'),
        placeholder: t('headings.manager'),
        options: usersStore.users,
        itemTitle: 'name',
        itemValue: 'id',
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.DEPARTMENT_MANAGER'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 6,
        type: 'selectBox',
        key: 'section_id',
        label: t('headings.sector'),
        placeholder: t('headings.sector'),
        options: sectors.value,
        itemTitle: 'translation_name',
        itemValue: 'id',
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.SECTOR'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        type: 'slot',
        key: 'tasks',
        cols: {
            lg: 12,
            md: 12
        }
    },
]);


watch(dialog, (newValue, oldValue) => {
    if (newValue == false) {
        resetSchemaValues(schema.value)
        isCreate.value = true
    } else {
    }
});

watch(openDialog, (newValue, oldValue) => {
    if (newValue == true) {
        dialog.value = newValue
    } else {
        dialog.value = true
    }
    isCreate.value = false
});

onMounted(()=> {
    // tasks.value = departments.value.tasks
});


</script>

<style lang="scss" scoped>
._card-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.875rem;
    margin-bottom: 0;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.delete-btn {
    position: relative;

    &::before,
    &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: 45%;
        border-radius: 1rem;
        background-color: rgba(var(--v-theme-inputsBorder), 1);
        top: 50%;
        transform: translateY(-50%);
    }

    &::after {
        left: 0;
    }

    &::before {
        right: 0;
    }
}
</style>
