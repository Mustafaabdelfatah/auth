<template>
    <v-btn :size="btnSize" color="primary" elevation="0" :variant="variant" class="edit-btn" flat>
        <edit />
    </v-btn>
</template>

<script setup>
import edit from '@/assets/images/svg/edit.svg'
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
    border: 1px solid rgba(var(--v-theme-primary), 1);
    border-radius: .25rem;

    .v-btn__content {
        svg {
            width: .813rem;
            height: .813rem;
        }
    }
}
</style>
