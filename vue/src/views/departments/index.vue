<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="departments.length == 0"></EmptyStateLoader>
        <ShowDepartments v-else :departments="departments" @OpenEditModal="OpenEditModal" @OpenDeleteModal="OpenDeleteModal">
        </ShowDepartments>
    </div>
    <AddEditDepartment @departmentAdded="fetchDepartments" @departmentEdited="fetchDepartments" v-model="dialog"
        :department="department" />
    <ConfirmationDialog @deleted="departmentDeletedAction" DialogType="unconfirm" v-model="deleteModal"
        :title="deleteSingleDepartment.translation_name" :text="deleteSingleDepartment.translation_description">
    </ConfirmationDialog>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { showAlert } from '@/composables/useAlert';
import { getDepartments, deleteDepartment } from '@/services/apis/departments'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();


// const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));
const ShowDepartments = defineAsyncComponent(() => import('@/views/departments/components/ShowDepartments.vue'));
const AddEditDepartment = defineAsyncComponent(() => import('@/views/departments/components/AddEditDepartment.vue'));
import EmptyStateLoader from '@/components/common/Loaders/index.vue'
// =====( Get departments Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);

const departments = ref([]);
const department = ref({});
const loading = ref(true);
const deleteSingleDepartment = ref({});



const fetchDepartments = async () => {
    appStore.cardLoading = true
    const data = await getDepartments();
    departments.value = data;
    appStore.cardLoading = false
};


const departmentDeletedAction = async () => {
    const id = deleteSingleDepartment.value.id
    const data = await deleteDepartment(id);
    fetchDepartments()
    deleteModal.value = false

};



const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    department.value = data
    console.log('department', department.value);

};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSingleDepartment.value = data
};


// =====( Set Page Breadcrumbs )====== //
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.departments',
        disabled: true,
        href: '/departments'
    }
]);



onMounted(() => {
    fetchDepartments();
});

</script>

<style lang="scss" scoped></style>b
