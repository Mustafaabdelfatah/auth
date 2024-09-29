<template>
    <div class="empty-state-loader">
        <div class="pulse-base">
            <div class="loader">
                <searchIcon />
            </div>
            <div class="loader-text">
                <slot>
                    {{ t('headings.no_data_available') }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import searchIcon from '@/assets/images/svg/search-lg.svg'

import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

</script>

<style lang="scss" scoped>
.empty-state-loader {
    min-height: 65vh;
    // height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .pulse-base {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 17rem;
        width: 17rem;
        border: 15px solid transparent;
        border-radius: 50%;
        margin: 0 auto;

        &::before {
            content: "";
            border: 1px solid rgba(var(--v-theme-cardBorder), 1);
            border-radius: 50%;
            height: 10rem;
            width: 10rem;
            position: absolute;
            animation: pulsate 1.6s ease-out;
            animation-iteration-count: infinite;
            opacity: 0.0;
            z-index: 99;
        }
        .loader-text {
            position: absolute;
            bottom: 1.5rem;
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 2.594rem;
            z-index: 100;
        }

        .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: .938rem;
            border: 1px solid rgba(var(--v-theme-cardBorder), 1);
            border-radius: .938rem;
        }
    }

}

// .pulse-base {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     height: 10rem;
//     width: 10rem;
//     border: 15px solid transparent;
//     border-radius: 50%;
//     margin: 0 auto;
// }

// .pulse-base:before {
//     content: "";
//     border: 15px solid rgba(var(--v-theme-cardBorder), 1);
//     border-radius: 50%;
//     height: 10rem;
//     width: 10rem;
//     position: absolute;
//     // left: 50%;
//     // bottom: 50%;
//     // transform: translate(-50%, -50%);
//     animation: pulsate 1.6s ease-out;
//     animation-iteration-count: infinite;
//     opacity: 0.0;
//     z-index: 99;
// }

@keyframes pulsate {
    0% {
        transform: scale(0.6, 0.6);
        opacity: 0.0;
    }

    50% {
        opacity: 1.0;
    }

    100% {
        transform: scale(2, 2);
        opacity: 0.0;
    }
}
</style>
