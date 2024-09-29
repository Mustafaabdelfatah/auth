<template>
    <div class="ps-lg-5 pe-lg-6">
        <Tabs :tabs="tabs" initialTab="sms" v-model="templateStatus.templateType">
            <template v-slot:sms>
                <EmptyStateLoader v-if="filteredTemplates('sms').length == 0"></EmptyStateLoader>
                <ShowTemplates :templates="filteredTemplates('sms')" @OpenEditModal="OpenEditModal"
                    @OpenDeleteModal="OpenDeleteModal" />
            </template>
            <template v-slot:mail>
                <EmptyStateLoader v-if="filteredTemplates('mail').length == 0"></EmptyStateLoader>
                <ShowTemplates :templates="filteredTemplates('mail')" @OpenEditModal="OpenEditModal"
                    @OpenDeleteModal="OpenDeleteModal" />
            </template>
        </Tabs>
    </div>
    <AddEditTemplate @templateAdded="fetchTemplates" @templateEdited="fetchTemplates" v-model="dialog"
        :template="template" />
    <ConfirmationDialog @deleted="templatesDeletedAction" DialogType="unconfirm" v-model="deleteModal"
        :title="deleteSingleTemplate.translation_name">
    </ConfirmationDialog>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { showAlert } from '@/composables/useAlert';
import { getTemplates, deleteTemplate } from '@/services/apis/templates'
import Tabs from '@/components/common/Tabs/index.vue'
import  EmptyStateLoader  from '@/components/common/Loaders/index.vue'



import { useAppStore } from '@/stores/app'
const appStore = useAppStore();

import { useTemplate } from '@/stores/templates'
const templateStatus = useTemplate();

import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const tabs = ref([
    { value: 'sms', label: t('tables.sms') },
    { value: 'mail', label: t('tables.email') }
]);

// const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));
const ShowTemplates = defineAsyncComponent(() => import('@/views/templates/components/ShowTemplates.vue'));
const AddEditTemplate = defineAsyncComponent(() => import('@/views/templates/components/AddEditTemplate.vue'));

// =====( Get Templates Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);

const templates = ref([]);
const template = ref({});
const loading = ref(true);
const deleteSingleTemplate = ref({});


const fetchTemplates = async () => {
    appStore.cardLoading = true
    const data = await getTemplates();
    templates.value = data;
    appStore.cardLoading = false
};


const templatesDeletedAction = async () => {
    const id = deleteSingleTemplate.value.id
    const data = await deleteTemplate(id);
    fetchTemplates()
    deleteModal.value = false
};



const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    template.value = data
};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSingleTemplate.value = data
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
        title: 'dl.templates',
        disabled: true,
        href: '/templates'
    }
]);


const filteredTemplates = (type) => {
    return computed(() =>
        templates.value.filter(template => template.type === type)
    ).value;
};

const currentTab =  () => {
    console.log('hhhhh');
};

onMounted(() => {
    fetchTemplates();
});

</script>

<style lang="scss" scoped>
::v-deep {
    .v-tabs {
        gap: .5rem;
        height: 3.5rem;
        width: fit-content;
        background-color: rgba(var(--v-theme-white), 1);
        border-radius: .75rem;
        color: rgba(var(--v-theme-text), 1);
        padding: .5rem;

        .v-slide-group__content> :not(:last-child) {
            margin-inline-end: .5rem;
        }

        .v-btn {
            height: 100%;
            font-weight: 700;
            font-size: .875rem;
            line-height: 1.5rem;
            padding: .5rem 1rem;
        }

        .v-btn.v-tab-item--selected {
            background-color: rgba(var(--v-theme-primary), 1);
            color: rgba(var(--v-theme-white), 1);
        }

    }
}
</style>
