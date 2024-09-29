<template>
    <v-btn :size="btnSize" elevation="0" color="error" :variant="variant" flat class="delete-btn">
        <trash />
    </v-btn>
</template>

<script setup>
import trash from '@/assets/images/svg/trash.svg'
import { defineProps } from 'vue';
const props = defineProps({
    btnSize: {
        type: Number,
        default: 30,
    },
    variant: {
        type: String,
        default: 'text',
    },
});


</script>

<style lang="scss" scoped>
.v-btn::v-deep {
    border: 1px solid rgba(var(--v-theme-error), 1);
    border-radius: .25rem;

    .v-btn__content {
        svg {
            width: .813rem;
            height: .813rem;
        }
    }
}
</style>
