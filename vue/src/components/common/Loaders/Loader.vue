<template>
    <div class="loader_container">
        <div class="loader"></div>
        <div class="loader_text">
            <slot>
                {{ t('headings.loading') }}
            </slot>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

</script>

<style lang="scss" scoped>
.loader_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;


    .loader {
        margin: 2rem;
        width: 6rem;
        padding: .5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background: rgba(var(--v-theme-primary), 1);
        --_m:
            conic-gradient(#0000 10%, #000),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
        mask: var(--_m);
        -webkit-mask-composite: source-out;
        mask-composite: subtract;
        animation: l3 1s infinite linear;
    }

    .loader_text {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: fit-content;
        height: fit-content;
        position: absolute;
        bottom: 1.5rem;
        font-size: .8rem;
        font-weight: 500;
        z-index: 100;
    }
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}
</style>
