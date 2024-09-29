<template>
    <GeneralCard>
        <v-card-title>
            <div class="_card-header d-flex justify-space-between">
                <h5 class="_card-title d-flex align-center">
                    {{ useTextTruncator(title, 50) }}
                </h5>
                <div class="d-flex ga-2">
                    <slot></slot>
                </div>
            </div>
        </v-card-title>

        <v-card-text>
            <p class="_card-text">
            <div v-if="text != ''">
                {{ useTextTruncator(text, 140) }}
            </div>
            <div v-else v-html="htmlContent"></div>
            </p>
        </v-card-text>

        <v-card-actions class="w-100 d-flex" v-if="$slots.actions">
            <div class="_card-actions d-flex w-100">
                <slot name="actions">
                    <v-btn v-ripple="{ class: `text-primary` }" variant="outline" class="d-flex w-100">
                        {{ t('buttons.show_details') }}
                    </v-btn>
                </slot>
            </div>
        </v-card-actions>
    </GeneralCard>

</template>

<script setup>
import GeneralCard from './GeneralCard.vue'
import EditBtn from './../buttons/EditBtn.vue'
import DeleteBtn from './../buttons/DeleteBtn.vue'
import { useTextTruncator } from '@/composables/useTextTruncator.js'



import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    title: {
        type: String,
    },
    text: {
        type: String,
        default: ''
    },
    htmlContent: {
        type: String,
    }
});


</script>

<style lang="scss" scoped>
.v-card::v-deep {
    padding: 1.25rem 1rem;
    border-radius: .75rem;

    .v-card-title,
    .v-card-subtitle,
    .v-card-item,
    .v-card-text,
    .v-card-actions {
        min-height: fit-content;
        max-height: 2.375rem;
        padding: 0 !important;
    }


    ._card-header {
        margin-bottom: .875rem;

        ._card-title {
            font-size: .875rem;
            font-weight: 600;
            line-height: normal;
            text-wrap: wrap;
            letter-spacing: 0.073px;
        }
    }

    // ._card-subtitle {
    //     font-size: 12px;
    //     font-weight: 400;
    //     line-height: 14.63px;
    //     color: rgba(var(--v-theme-text), 1);
    // }

    ._card-text {
        font-size: .75rem;
        font-weight: 400;
        line-height: normal;
        color: rgba(var(--v-theme-text), 1);
        letter-spacing: 0.073px;
        margin-bottom: 1rem;
    }

    ._card-actions {

        .v-btn {
            font-size: .75rem;
            font-weight: 400;
            line-height: 150%;
            letter-spacing: 0.3px;
            max-height: 2.375rem;
            border-radius: .375rem;
            // padding: 1.5rem;

            &:hover>.v-btn__overlay {
                background-color: rgba(var(--v-theme-primary), 1);
                opacity: .2;
            }

            &.border-thin {
                border-color: rgba(var(--v-theme-primary), .2) !important;
            }
        }

    }
}
</style>
