<template>
    <v-btn :size="btnSize" color="primary" elevation="0" :variant="variant" class="show-btn" flat>
        <eye />
    </v-btn>
</template>

<script setup>
import eye from '@/assets/images/svg/eye.svg'
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

    // .v-btn__content {
    //     svg {
    //         width: 1rem;
    //         height: 1rem;
    //     }
    // }
}
</style>
