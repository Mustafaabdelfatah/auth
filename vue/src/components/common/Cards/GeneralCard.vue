<template>
    <v-card  :class="{ 'loading': appStore.cardLoading }" variant="text" flat height="100%">
        <slot></slot>
        <template #loader v-if="appStore.cardLoading">
            <v-skeleton-loader class=" border" max-width="100%" height="100%"
                type="heading, paragraph"></v-skeleton-loader>
        </template>
    </v-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();

</script>

<style lang="scss" scoped>
.v-card::v-deep {
    box-shadow: none !important;
    border: 1px solid rgba(var(--v-theme-cardBorder), 1);
    border-radius: .5rem;
    background-color: rgba(var(--v-theme-white), 1);
    padding: 23px 25px 17px 25px;
    display: flex;
    flex-direction: column;

    .v-card-title,
    .v-card-subtitle,
    .v-card-item,
    .v-card-text,
    .v-card-actions {
        padding: 0 !important;
    }

    &.loading .v-card__loader {
        height: 100%;
    }
}
</style>
