<template>
    <div >
        <v-list>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.first_name') }}
                </template>
                <v-list-item-title v-text="user.name"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.gender') }}
                </template>
                <v-list-item-title v-text="user.gender"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.birth_date') }}
                </template>
                <v-list-item-title v-text="user.birth_date"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.email') }}
                </template>
                <v-list-item-title v-text="user.email"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.phone') }}
                </template>
                <v-list-item-title v-text="user.phone?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.personal_address') }}
                </template>
                <v-list-item-title v-text="user.address?? '----------'"></v-list-item-title>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    {{ t('headings.id') }}
                </template>
                <v-list-item-title v-text="user.id_number?? '----------'"></v-list-item-title>
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
