<template>
    <v-btn v-if="routerLink" :prepend-icon="plus" :ripple="false" @click="goTo(props.routePath)">
        <slot>
            {{ t('buttons.add') }}
        </slot>
    </v-btn>
    <v-btn v-else :prepend-icon="plus" :ripple="false">
        <slot>
            {{ t('buttons.add') }}
        </slot>
    </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import plus from '@/assets/images/svg/plus.svg'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { defineProps } from 'vue';


const props = defineProps({
    btnSize: {
        type: Number,
        default: 30
    },
    routerLink: {
        type: Boolean,
        default: false
    },
    routePath: {
        type: String,
        default: '/'
    }
});

function goTo(path) {
    router.push(`${path}`);
};

</script>

<style lang="scss" scoped>
.v-btn::v-deep {
    border: 1px solid rgba(var(--v-theme-secondary), 1);
    background-color: rgba(var(--v-theme-secondary), 1);
    color: rgba(var(--v-theme-white), 1);
    border-radius: .5rem !important;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .875rem;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.2px;

    .v-btn__prepend {
    margin-inline-end: .5rem;
}
}
</style>
