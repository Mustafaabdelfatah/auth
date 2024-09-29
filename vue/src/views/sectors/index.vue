<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="sectors.length == 0"></EmptyStateLoader>
        <ShowSectors v-else :sectors="sectors" @OpenEditModal="OpenEditModal" @OpenDeleteModal="OpenDeleteModal"></ShowSectors>
    </div>
    <AddEditSector @sectorAdded="fetchSectors" @sectorEdited="fetchSectors" v-model="dialog" :sector="sector"/>
    <ConfirmationDialog @deleted="sectorDeletedAction"  DialogType="unconfirm" v-model="deleteModal" :title="deleteSingleSector.translation_name" :text="deleteSingleSector.translation_description"></ConfirmationDialog>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { showAlert } from '@/composables/useAlert';
import { getSectors, deleteSector } from '@/services/apis/sectors.js'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();



// const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));
const ShowSectors = defineAsyncComponent(() => import('@/views/sectors/components/ShowSectors.vue'));
const AddEditSector = defineAsyncComponent(() => import('@/views/sectors/components/AddEditSector.vue'));
import  EmptyStateLoader  from '@/components/common/Loaders/index.vue'

// =====( Get Sectors Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);

const sectors = ref([]);
const sector = ref({});
const deleteSingleSector = ref({});


const fetchSectors = async () => {
    appStore.cardLoading = true
    const data = await getSectors();
    sectors.value = data;
    appStore.cardLoading = false
};


const sectorDeletedAction = async () => {
    const id = deleteSingleSector.value.id
    const data = await deleteSector(id);
    fetchSectors()
    deleteModal.value = false

};



const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    sector.value = data
};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSingleSector.value = data
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
        title: 'dl.sectors',
        disabled: true,
        href: '/sectors'
    }
]);



onMounted(() => {
    fetchSectors();
});

</script>

<style lang="scss" scoped>

</style>b
