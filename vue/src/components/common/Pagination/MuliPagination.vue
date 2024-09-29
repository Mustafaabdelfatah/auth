<template>
    <v-row class="pt-5" no-gutters>
        <v-col cols="8">
            <v-pagination v-model="current_page" @update:modelValue="getTableData" :length="totalPages"
                :total-visible="mobile ? 3 : 10" :disabled="totalPages === 1" show-first-last-page density="compact"
                next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" class="my-0 justify-end">
                <template #item="{ page }">
                    <div class="paginate_item d-flex align-center justify-center cursor-pointer"
                        @click="getTableData(page)">
                        <span>
                            {{ locale === 'ar' ? useNumConverter(page) : page }}
                        </span>
                    </div>
                </template>
            </v-pagination>
        </v-col>
        <v-col cols="4">
            <div class="d-flex align-center justify-end ga-1">
                <div class="me-3">
                    <p>
                        {{
                            ` ${t('pagination.show')} ${locale === 'ar' ? useNumConverter(props.startPageItems) :
                                props.startPageItems} ${t('pagination.to')} ${locale === 'ar' ?
                                    useNumConverter(props.endPageItems) :
                                    props.endPageItems} ${t('pagination.origin')}
                        ${locale === 'ar' ? useNumConverter(props.totalItems) :
                                props.totalItems
                            }`
                        }}
                    </p>
                </div>
                <v-select flat hide-details density="compact" v-model="translatedPaginationValue"
                    :items="translatedPaginationList" @update:modelValue="handlePaginationChange" width="100"
                    variant="outlined"></v-select>
            </div>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'
import { useNumConverter, useEnglishNumConverter } from '@/composables/useNumConverter.js'
import { useI18n } from 'vue-i18n'
import { useDisplay } from "vuetify";
const { mobile } = useDisplay()

const { t, locale } = useI18n();
const props = defineProps({
    totalItems: {
        type: [Number, String],
        default: 10
    },
    totalPages: {
        type: [Number, String],
        default: 1
    },
    perPage: {
        type: [Number, String],
        default: 10
    },
    currentPage: {
        type: [Number, String],
        default: 1
    },
    endPageItems: {
        type: [Number, String],
        default: 1
    },
    startPageItems: {
        type: [Number, String],
        default: 1
    },
});
const emit = defineEmits(['updateTableData'])
const pageSize = ref(props.perPage ?? 10)
const current_page = ref(props.currentPage ?? 1)

const paginationList = ref([10, 20, 50, 100, 200])

const translatedPaginationList = computed(() => {
    return paginationList.value.map((item) => {
        if (locale.value === 'ar') return useNumConverter(item)
        else return item
    })
})

const handlePaginationChange = (newValue) => {
    if (locale.value === 'ar') {
        newValue = useEnglishNumConverter(newValue)
    }
    pageSize.value = newValue
    getTableData(1)
}

const translatedPaginationValue = computed(() => {
    if (locale.value === 'ar') {
        return useNumConverter(pageSize.value)
    }
    return pageSize.value
})

const getTableData = (page) => {
    emit('updateTableData', page, pageSize.value);
};
</script>

<style lang="scss" scoped>
.paginate_item {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(var(--v-theme-paginationBorder), 1);
    border-radius: 8px;
}

.v-pagination::v-deep {
    .v-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: .875rem;
        font-weight: 600;
        line-height: 1.2rem;
        color: rgba(var(--v-theme-tableBodyText), 1);
        letter-spacing: 0 !important;
        text-indent: 0 !important;
    }

    .v-btn__content {
        color: rgba(var(--v-theme--tableBodyText), 1) !important;

        svg {
            fill: rgba(var(--v-theme-white), 1);
        }
    }

    .v-pagination__prev,
    .v-pagination__next {
        .v-btn {
            border: 1px solid rgba(var(--v-theme-paginationBorder), 1);
        }

        .v-btn.v-btn--disabled {
            opacity: 1;

            i {
                opacity: .5;
            }
        }
    }

    .v-pagination__item.v-pagination__item--is-active {
        .v-btn {
            background-color: rgba(var(--v-theme-paginationBG), 1);
        }
    }

    .v-pagination__list {
        justify-content: flex-start;
    }
}

.v-select::v-deep {
    &.v-input {}

    .v-field {
        border-radius: .5rem;
        // border: 1px solid rgba(var(--v-theme-tableBodyBorder), 1);
        padding: 0;

        .v-field__append-inner {
            width: 2rem;

            i {
                width: 100%;
                height: 100%;
                margin: 0;
            }
        }

        .v-field__input {
            padding: .625rem;
        }

        .v-field--variant-outlined.v-field--focused .v-field__outline {
            --v-field-border-width: 1px;
        }

        .v-field__outline {
            padding: 0;
            --v-field-border-opacity: 0.8;
        }
    }

    .v-select__selection-text {
        font-size: .9rem;
        font-weight: 500;
        line-height: 1.2rem;
    }

    &.v-input--density-compact {
        --v-input-control-height: 2rem;
        --v-input-padding-top: .5rem;
    }

    &.v-input--horizontal {
        max-width: 4.5rem;
    }
}
</style>
