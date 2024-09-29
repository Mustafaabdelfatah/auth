<template>
    <VueDatePicker ref="dp" v-model="date" :flow="flow" hide-input-icon :is-24="false" :offset="5" :teleport="true"
        position="left" month-name-format="short"
        :day-names="[t('calendar.mon'), t('calendar.tue'), t('calendar.wed'), t('calendar.thu'), t('calendar.fri'), t('calendar.sat'), t('calendar.sun'),]"
        :format-locale="$vuetify.locale.current === 'ar' ? arEG : enUS" :select-text="t('buttons.select')"
        :cancel-text="t('buttons.cancel')" :action-row="{ showNow: true }" :now-button-label="t('buttons.now')"
        :dark="!!isDark" arrow-navigation>
        <!-- <template #menu-header>
            <div class="my-header">My custom header</div>
        </template> -->
        <template #top-extra="{ value }">
            <div class="d-flex justify-center align-center py-2 mb-2 border-b-thin">
                <span v-if="value">{{
                    $vuetify.locale.current === 'ar' ?
                        useNumConverter(moment(value).format(`YYYY-MM-DD & HH:mm:ss`)) :
                        moment(value).format('YYYY-MM-DD & HH:mm:ss')
                  }}</span>
                <span v-else>{{ t('calendar.not_selected') }}</span>
            </div>
        </template>
        <template #calendar-header="{ index, day }">
            <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                {{ day }}
            </div>
        </template>

        <template #day="{ day, date }">
          {{ $vuetify.locale.current === 'ar' ? useNumConverter(day) : day }}
        </template>

        <template #hours="{ text, value }">
          {{ $vuetify.locale.current === 'ar' ? useNumConverter(value) : value }}
        </template>

        <template #minutes="{ text, value }">
          {{ $vuetify.locale.current === 'ar' ? useNumConverter(value) : value }}
        </template>

        <template #year="{ value }">
          {{ $vuetify.locale.current === 'ar' ? useNumConverter(value) : value }}
        </template>

        <!-- <template #month="{ value }">
            {{ $vuetify.locale.current === 'ar' ? useNumConverter(value) : value }}
        </template> -->

        <template #am-pm-button="{ toggle, value }">
            <v-btn @click="toggle" variant="text" class="bg-primary" :slim="true" flat size="small">
                {{ $vuetify.locale.current === 'ar' ? (value === 'AM' ? 'صباحا' : 'مساء') : value }}
            </v-btn>
        </template>

        <!-- <template #action-preview="{ value }">
            {{ formattedDate(value) }}
        </template> -->

        <!-- <template #action-buttons>
            <p class="custom-select" @click="selectDate">Select</p>
        </template> -->
        <template #trigger>
            <slot name="trigger"></slot>
        </template>
    </VueDatePicker>
</template>


<script setup>
import { ref } from 'vue'
import { useNumConverter } from '@/composables/useNumConverter.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { arEG, enUS } from 'date-fns/locale';
import moment from 'moment'

import { useIsDark } from '@/composables/useIsDark'
const isDark = useIsDark()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const flow = ref(['calendar', 'time']);

// const dp = ref();

const date = defineModel();


</script>

<style>
.dp__today {
    border: 1px solid rgba(var(--v-theme-primary), 1);
    color: rgba(var(--v-theme-primary), 1);
}

.dp__calendar_item {
    color: rgba(var(--v-theme-text), 1);
}

.dp__cell_inner {
    height: 1.8rem;
    padding: .2rem;
    width: 1.8rem;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.25rem;
}

.dp__time_display {
    color: rgba(var(--v-theme-text), 1);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.25rem;
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
    background: rgba(var(--v-theme-primary), 1);
    color: rgba(var(--v-theme-white), 1);
}
</style>

<style lang="scss" scoped>
.v-btn--icon {
    border-radius: .3rem !important;
}

.v-btn--icon.v-btn--density-default {
    width: 2rem;
    height: 2rem;
}

.v-btn--icon.v-btn--size-default {
    --v-btn-size: .8rem;
}

.red-color {
    color: red;
}

// :root {
//     /*General*/
//     --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
//     "Helvetica Neue", sans-serif;
//     --dp-border-radius: 4px; /*Configurable border-radius*/
//     --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
//     --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

//     /*Sizing*/
//     --dp-button-height: 35px; /*Size for buttons in overlays*/
//     --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
//     --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
//     --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
//     --dp-cell-size: 35px; /*Width and height of calendar cell*/
//     --dp-cell-padding: 5px; /*Padding in the cell*/
//     --dp-common-padding: 10px; /*Common padding used*/
//     --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
//     --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
//     --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
//     --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
//     --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
//     --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
//     --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
//     --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
//     --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
//     --dp-menu-padding: 6px 8px; /*Menu padding*/

//     /*Font sizes*/
//     --dp-font-size: 1rem; /*Default font-size*/
//     --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
//     --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

//     /*Transitions*/
//     --dp-animation-duration: 0.1s; /*Transition duration*/
//     --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
//     --dp-transition-timing: ease-out; /*Timing on slide animations*/
// }

// .dp__theme_light {
//     --dp-background-color: #fff;
//     --dp-text-color: #212121;
//     --dp-hover-color: #f3f3f3;
//     --dp-hover-text-color: #212121;
//     --dp-hover-icon-color: #959595;
//     --dp-primary-color: #1976d2;
//     --dp-primary-disabled-color: #6bacea;
//     --dp-primary-text-color: #f8f5f5;
//     --dp-secondary-color: #c0c4cc;
//     --dp-border-color: #ddd;
//     --dp-menu-border-color: #ddd;
//     --dp-border-color-hover: #aaaeb7;
//     --dp-border-color-focus: #aaaeb7;
//     --dp-disabled-color: #f6f6f6;
//     --dp-scroll-bar-background: #f3f3f3;
//     --dp-scroll-bar-color: #959595;
//     --dp-success-color: #76d275;
//     --dp-success-color-disabled: #a3d9b1;
//     --dp-icon-color: #959595;
//     --dp-danger-color: #ff6f60;
//     --dp-marker-color: #ff6f60;
//     --dp-tooltip-color: #fafafa;
//     --dp-disabled-color-text: #8e8e8e;
//     --dp-highlight-color: rgb(25 118 210 / 10%);
//     --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
//     --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
//     --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
// }

// .dp__theme_dark {
//     --dp-background-color: #212121;
//     --dp-text-color: #fff;
//     --dp-hover-color: #484848;
//     --dp-hover-text-color: #fff;
//     --dp-hover-icon-color: #959595;
//     --dp-primary-color: #005cb2;
//     --dp-primary-disabled-color: #61a8ea;
//     --dp-primary-text-color: #fff;
//     --dp-secondary-color: #a9a9a9;
//     --dp-border-color: #2d2d2d;
//     --dp-menu-border-color: #2d2d2d;
//     --dp-border-color-hover: #aaaeb7;
//     --dp-border-color-focus: #aaaeb7;
//     --dp-disabled-color: #737373;
//     --dp-disabled-color-text: #d0d0d0;
//     --dp-scroll-bar-background: #212121;
//     --dp-scroll-bar-color: #484848;
//     --dp-success-color: #00701a;
//     --dp-success-color-disabled: #428f59;
//     --dp-icon-color: #959595;
//     --dp-danger-color: #e53935;
//     --dp-marker-color: #e53935;
//     --dp-tooltip-color: #3e3e3e;
//     --dp-highlight-color: rgb(0 92 178 / 20%);
//     --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
//     --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
//     --dp-range-between-border-color: var(--dp-hover-color, #fff);
// }</style>
