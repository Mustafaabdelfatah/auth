<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="positions.length == 0"></EmptyStateLoader>
        <ShowPositions v-else :positions="positions" @OpenEditModal="OpenEditModal" @OpenDeleteModal="OpenDeleteModal"></ShowPositions>
    </div>
    <AddEditPosition @positionAdded="fetchPositions" @positionEdited="fetchPositions" v-model="dialog" :position="position"/>
    <ConfirmationDialog @deleted="positionDeletedAction"  DialogType="unconfirm" v-model="deleteModal" :title="deleteSinglePosition.translation_name" :text="deleteSinglePosition.translation_description"></ConfirmationDialog>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { showAlert } from '@/composables/useAlert';
import { getPositions, deletePosition } from '@/services/apis/positions'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();



// const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));
const ShowPositions = defineAsyncComponent(() => import('@/views/positions/components/ShowPositions.vue'));
const AddEditPosition = defineAsyncComponent(() => import('@/views/positions/components/AddEditPosition.vue'));
import  EmptyStateLoader  from '@/components/common/Loaders/index.vue'

// =====( Get positions Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);

const positions = ref([]);
const position = ref({});
const loading = ref(true);
const deleteSinglePosition = ref({});


const fetchPositions = async () => {
    appStore.cardLoading = true
    const data = await getPositions();
    positions.value = data;
    appStore.cardLoading = false
};


const positionDeletedAction = async () => {
    const id = deleteSinglePosition.value.id
    const data = await deletePosition(id);
    fetchPositions()
    deleteModal.value = false

};


const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    position.value = data
};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSinglePosition.value = data
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
        title: 'dl.positions',
        disabled: true,
        href: '/positions'
    }
]);



onMounted(() => {
    fetchPositions();
});

</script>

<style lang="scss" scoped>

</style>
