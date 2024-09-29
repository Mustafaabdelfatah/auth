<template>
    <v-card variant="text" flat height="100%" :ripple="false">
        <div v-if="showHeader" class="header">
            <div class="search">
                <searchInput :dirty="true" :clearable="false" @searchValue="passingSearchValue"
                    :placeholder="t('headings.search')" />
            </div>


            <div class="actions-container">
                <div class="actions" v-if="selectedRows.length">
                    <!-- <div class="action">
                        <v-btn block min-height="45" color="primary" variant="outlined" class="actions__btn">
                            <img :src="edit" />
                            <span class="btn-text">{{ t('buttons.edit') }}</span>
                        </v-btn>
                    </div> -->
                    <div class="action">
                        <v-btn @click="deleteRows" block min-height="45" color="red" variant="outlined"
                            class="actions__btn">
                            <img :src="trash" />
                            <span class="btn-text">{{ t('buttons.delete') }}</span>
                        </v-btn>
                    </div>
                </div>
                <div class="add">
                    <v-btn @click="openModal" color="primary" elevation="0" class="font-weight-bold" block
                        min-height="45">
                        <v-icon class="ms-1" size="20">mdi-plus-circle-outline</v-icon>
                        <span>{{ addButtonTitle }}</span>
                        <slot name="modal"></slot>
                    </v-btn>
                </div>
            </div>
        </div>

        <slot name="header"></slot>
        <v-data-table-server :headers="headers" :items="items" v-model="selectedRows" :item-value="itemValue"
            class="flex-grow-1 cursor-pointer rounded-0" :items-per-page="itemsPerPage" :items-length="items.length"
            :show-select="showSelect" :loading="isLoading" :show-expand="showExpand" :total-items="items.length"
            :sort-asc-icon="sortIcon" :sort-desc-icon="sortIcon" sticky>

            <template v-slot:loading>
                <Loader />
                <!-- <v-skeleton-loader :type="`table-row@${itemsPerPage}`"></v-skeleton-loader> -->
            </template>

            <template #item.id="{ item }">
                <span>#{{ locale === 'ar' ? useNumConverter(item.id) : item.id }}</span>
            </template>
            <template #item.index="{ item }">
                <span>#{{ locale === 'ar' ? useNumConverter(item.index + 1) : item.index + 1 }}</span>
            </template>
            <template #item.datetime="{ item }">
                <span>{{ formatDateTime(item.date).date }}</span>
            </template>
            <template #item.created_at="{ item }">
                {{ formatDateTime(item.created_at).date ?? formatDateTime(new Date()).date }}
            </template>
            <template #expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length">
                        <span class="w-100 text-left mx-auto">{{ item.full_text }}</span>
                    </td>
                </tr>
            </template>

            <template v-for="(_, slot) in $slots" v-slot:[slot]="slotProps">
                <slot :name="slot" v-bind="slotProps" />
            </template>
        </v-data-table-server>
    </v-card>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
import { useNumConverter } from '@/composables/useNumConverter.js'
import { useDateTimeFormat } from '@/composables/useDateTimeFormat'
import { useLocale } from 'vuetify'

const { current } = useLocale()
import { useI18n } from 'vue-i18n'
import searchInput from '@/components/common/FieldsTypes/searchInput.vue'
import Loader from '@/components/common/Loaders/Loader.vue'
import sortIcon from '@/assets/images/svg/sort.svg?row'
import trash from '@/assets/images/svg/trash.svg?row'

const { formatDateTime } = useDateTimeFormat(current.value)

const { t, locale } = useI18n()

const props = defineProps({
    headers: Array,
    items: Array,
    page: Number,
    total: Number,
    numberOfPages: Number,
    addButtonTitle: String,
    isLoading: Boolean,
    search: String,
    showExpand: Boolean,
    showSelect: Boolean,
    showHeader: {
        type: Boolean,
        default: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    },
    itemValue: {
        type: String,
        default: 'id'
    }
})

const emit = defineEmits(['searchValue', 'deleteRows', 'openModal', 'tableOptions'])
const selectedRows = ref([])

const passingSearchValue = (value) => emit('searchValue', value)
const loadItems = (page = 1, itemsPerPage = 10, sortBy = 'asc') => {
    let options = { page, per_page: itemsPerPage, sortBy }
    emit('tableOptions', options)
}
const openModal = () => emit('openModal')
const deleteRows = () => emit('deleteRows', selectedRows.value);
</script>

<style lang="scss" scoped>
.v-card {
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: none !important;
    background-color: rgba(var(--v-theme-white), 1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;

    .search {
        width: 400px;
    }

    .actions-container {
        width: calc(100% - 400px);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 1rem;

        &__btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;
            padding: 8px;
            border-radius: 8px;
            transition: background-color 0.6s,
                justify-content 0.6s,
                width 0.6s;
            width: 40px;

            &:hover {
                width: 100px;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.1);
            }

            &:hover .btn-text {
                transform: translateX(-3px);
                opacity: 1;
            }

            .btn-text {
                opacity: 0;
                transform: translateX(-100%);
                max-height: 1em;
                white-space: nowrap;
                transition: transform 0.6s,
                    opacity 0.6s;
            }
        }
    }

    .add {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 160px !important;

        .v-btn {
            &__content {
                gap: 8px;
                display: flex;
            }
        }
    }
}


.v-table::v-deep {

    .v-data-table-header__content {
        justify-content: space-between;
    }

    .v-data-table__thead {
        background-color: rgba(var(--v-theme-tableHeaderBG), 1);
        color: rgba(var(--v-theme-tableHeaderText), 1);
    }

    &>.v-table__wrapper>table>thead>tr>th {
        font-weight: 700 !important;
        font-size: 0.875rem;
        line-height: 1.2rem;
        border: none;
    }

    .v-table__wrapper tbody tr:hover {
        background: rgba(var(--v-theme-tableBodyBorder), .2);
        box-shadow: none;
    }

    .v-table__wrapper thead tr th {
        border: none !important;
    }

    .v-table__wrapper>table>thead>tr>th:not(.v-data-table__th--sorted) .v-data-table-header__sort-icon {
        transition: .5s ease-in opacity;
        opacity: .5;
    }

    .v-table__wrapper>table>thead>tr>th:not(.v-data-table__th--sorted):hover .v-data-table-header__sort-icon {
        opacity: 1;
    }

    .v-table__wrapper tbody tr td {
        border-bottom: 1px solid rgba(var(--v-theme-tableBodyBorder), 1) !important;
        font-weight: 400 !important;
        font-size: 0.875rem;
        line-height: 1.2rem;
        color: rgba(var(--v-theme-tableBodyText), 1);
    }

    .v-chip.v-chip--size-default {
        --v-chip-size: 0.9rem;
        --v-chip-height: 1.8rem;
        padding: .25rem 1rem;
        font-weight: 700 !important;
        font-size: .875rem;
        line-height: 1rem;
        border-radius: .5rem;
    }

    .v-table__wrapper>table>thead>tr>td.v-data-table-column--no-padding,
    .v-table__wrapper>table>thead>tr th.v-data-table-column--no-padding,
    .v-table__wrapper>table tbody>tr>td.v-data-table-column--no-padding,
    .v-table__wrapper>table tbody>tr th.v-data-table-column--no-padding {
        padding: 0 1rem;
    }

    .v-data-table-rows-no-data {
        td {
            margin: 2rem 0;
            font-size: 1rem !important;
            font-weight: 600 !important;
        }
    }
}
</style>
