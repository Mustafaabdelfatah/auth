<template>

    <v-row>
        <v-col cols="6" v-for="singleTemplate in templates" :key="singleTemplate.id">
            <ActionsCard @click="selectCard(singleTemplate.id)" class="action-card"
                :class="{ 'selected': templateID === singleTemplate.id }" :title="singleTemplate.translation_name"
                :htmlContent="singleTemplate.translation_description">
            </ActionsCard>
        </v-col>
    </v-row>

</template>

<script setup>
const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));

import { ref, defineAsyncComponent, defineEmits, onMounted, watch } from 'vue';
import { useTaskLogics } from '@/stores/task-logics'
const templateStatus = useTaskLogics()

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const props = defineProps({
    templates: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
    }
});

const templateID = defineModel()

const selectCard = (id) => {
    templateID.value = id
};

</script>

<style lang="scss" scoped>
.action-card::v-deep {
    cursor: pointer;
    transition: background-color 0.3s ease;

    ._card-header{
        padding: 0 !important;
        margin-bottom: .5rem !important;
    }

    ._card-text {
        margin-bottom: 0 !important;
    }

    &.selected {
        background-color: rgba(var(--v-theme-primary), .1);
        border: 1px solid rgba(var(--v-theme-primary), 1);
    }
}
</style>
