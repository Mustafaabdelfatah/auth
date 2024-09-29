<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="scenarios.length == 0"></EmptyStateLoader>
        <ShowScenarios v-else :scenarios="scenarios" @OpenAssignModal="OpenAssignModal" @OpenEditModal="OpenEditModal" @OpenDeleteModal="OpenDeleteModal"></ShowScenarios>
    </div>
    <AssignScenario @scenarioAssigned="fetchScenarios" v-model="scenarioDialog" :assignScenario="assignScenario"/>
    <AddEditScenario @scenarioAdded="fetchScenarios" @scenarioEdited="fetchScenarios" v-model="dialog" :scenario="scenario"/>
    <ConfirmationDialog @deleted="scenarioDeletedAction"  DialogType="unconfirm" v-model="deleteModal" :title="deleteSingleScenario.translation_name" :text="deleteSingleScenario.translation_description"></ConfirmationDialog>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { showAlert } from '@/composables/useAlert';
import { getScenarios, deleteScenario } from '@/services/apis/scenarios'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();


const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));
const ShowScenarios = defineAsyncComponent(() => import('@/views/scenarios/components/scenarios/ShowScenarios.vue'));
const AddEditScenario = defineAsyncComponent(() => import('@/views/scenarios/components/scenarios/AddEditScenario.vue'));
const AssignScenario = defineAsyncComponent(() => import('@/views/scenarios/components/scenarios/AssignScenario.vue'));
import  EmptyStateLoader  from '@/components/common/Loaders/index.vue'

// =====( Get positions Data )====== //
const dialog = ref(false);
const scenarioDialog = ref(false);
const deleteModal = ref(false);

const scenarios = ref([]);
const scenario = ref({});
const loading = ref(true);
const deleteSingleScenario= ref({});
const assignScenario= ref(null);


const fetchScenarios = async () => {
    appStore.cardLoading = true
    const data = await getScenarios();
    scenarios.value = data;
    appStore.cardLoading = false
};

const scenarioDeletedAction = async () => {
    const id = deleteSingleScenario.value.id
    const data = await deleteScenario(id);
    fetchScenarios()
    deleteModal.value = false

};

const OpenAssignModal = (data) => {
    scenarioDialog.value = !scenarioDialog.value
    assignScenario.value = data
};

const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    scenario.value = data
};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSingleScenario.value = data
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
        title: 'dl.scenarios',
        disabled: true,
        href: '/scenarios'
    }
]);



onMounted(() => {
    fetchScenarios();
});

</script>

<style lang="scss" scoped>

</style>
