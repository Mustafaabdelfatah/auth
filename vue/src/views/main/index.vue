<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader/>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import  EmptyStateLoader  from '@/components/common/Loaders/index.vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

// import { useRoute } from 'vue-router';
// const route = useRoute();
// const isSpecificComponent = route.matched.some(record =>
//     console.log('========>', route)
//     // return record.components.default === YourSpecificComponent
// );


const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));


const { t } = useI18n()

const { setBreadcrumbs } = useBreadcrumbs()

setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
])


</script>

<style lang="scss" scoped></style>b
