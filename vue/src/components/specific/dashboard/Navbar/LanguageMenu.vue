<template>
    <v-menu key="language-menu" close-delay="100" location="bottom end" open-delay="60">
        <template #activator="{ props }">
            <v-btn v-bind="props" path="languages" size="24" class="p-0">
                <div class="d-flex justify-center align-center">
                    <img src="@/assets/images/svg/ar.svg?row" width="24" v-if="locale == 'ar'" />
                    <img src="@/assets/images/svg/en.svg?row" width="24" v-if="locale == 'en'" />
                    <!-- <h6 class="ms-1">
            {{ t(`buttons.${String(locale).toLowerCase()}`) }}
          </h6> -->
                </div>
            </v-btn>
        </template>

        <v-sheet class="overflow-hidden language_wrapper" rounded>
            <v-list :lines="false" density="compact" nav min-width="125">
                <v-list-item v-for="(item, i) in locales" :key="i" :value="item.value" color="primary"
                    @click="switchLocale(item.value)" class="d-flex justify-space-between align-center">
                    <template v-slot:append>
                        <img src="@/assets/images/svg/ar.svg?row" width="16" v-if="i === 0" />
                        <img src="@/assets/images/svg/en.svg?row" width="16" v-if="i === 1" />
                    </template>

                    <span class="language_option mx-2">
                        {{ t(`buttons.${String(item.title).toLowerCase()}`) }}
                    </span>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>
</template>

<script setup>
import { useLocale } from 'vuetify'
import storage from '@/composables/useStorage'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

const { t, locale } = useI18n()

const locales = [
    { title: 'Arabic', value: 'ar' },
    { title: 'English', value: 'en' }
]

const local = useLocale()

const appStore = useAppStore()

function switchLocale(lang) {
    local.current.value = lang
    appStore.locale.current = lang
    storage.set('locale', lang)
}
</script>

<style lang="scss">
.language_wrapper {
    border-radius: 7px !important;
    border: 1px solid #eaecf0 !important;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08) !important;
    min-height: 70px;

    .v-list {
        padding: 0 !important;

        .v-list-item {
            margin-bottom: 0;
            padding: 8px;
            border-radius: 0;

            &:first-child {
                border-bottom: 1px solid #eaecf0;
            }
        }
    }
}

.language_option {
    font-size: 12px;
    font-weight: 700;
}
</style>
