<template>
    <GeneralCard>
        <slot></slot>
    </GeneralCard>
</template>

<script setup>
import GeneralCard from '@/components/common/Cards/GeneralCard.vue';


</script>

<style lang="scss" scoped>
.v-card::v-deep {
    height: fit-content !important;
    padding: 1.5rem;
    border: none;
    border-radius: 1rem !important;
    background-color: rgba(var(--v-theme-white), 1);
}
</style>
