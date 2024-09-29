<template>
    <div>
        <v-list>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.sector') }}
                </template>
                <v-list-item-title v-text="user.section.translation_name ?? '-------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.main_department') }}
                </template>
                <v-list-item-title v-text="user.department.translation_name ?? '-------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.sub_department') }}
                </template>
                <v-list-item-title v-text="user.sub_department?.translation_name ?? '--------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.position') }}
                </template>
                <v-list-item-title v-text="user.position.translation_name ?? '---------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.job_title') }}
                </template>
                <v-list-item-title v-text="user.title ?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.salary') }}
                </template>
                <v-list-item-title v-text="user.salary ?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.medical_checkup') }}
                </template>
                <v-list-item-title v-text="user.id_number ?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.technical_level') }}
                </template>
                <v-list-item-title v-text="user.technical_level ?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.joining_date') }}
                </template>
                <v-list-item-title v-text="user.joining_date ?? '----------'"></v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const props = defineProps({
    user: Object,
});
</script>

<style lang="scss" scoped></style>
