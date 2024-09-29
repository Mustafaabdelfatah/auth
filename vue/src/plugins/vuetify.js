import storage from '@/composables/useStorage'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { theme } from '@/data/theme'
import { ar as vuetifyAR, en as vuetifyEN } from 'vuetify/locale'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import { useNumConverter } from '@/composables/useNumConverter.js'
// import { md3 } from 'vuetify/blueprints'

// import '@/assets/sass/global/variables.scss';

const vuetify = (app) => {
    const i18n = new createI18n({
        legacy: false, // Vuetify does not support the legacy mode of vue-i18n
        locale: storage.get('locale') || import.meta.env.VITE_LOCALE,
        fallbackLocale: storage.get('locale') || import.meta.env.VITE_LOCALE,
        rtl: { ar: true },
        messages: {
            en: {
                $vuetify: vuetifyEN,
                ...en
            },
            ar: {
                $vuetify: vuetifyAR,
                ...ar
            }
        }
    })

    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    const vuetify = createVuetify({
        // blueprint: md3,
        theme,
        locale: {
            adapter: createVueI18nAdapter({ i18n, useI18n })
        },
        components,
        directives,
        defaults: {
            global: {
                ripple: true
            },
            VTextField: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'blue'
            },
            VSelect: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'blue'
            },
            VBtn: {
                rounded: 'md'
            },
            VDataTable: {
                showSelect: true,
                hideDefaultFooter: true,
                itemsPerPageOptions: [5, 10, 20, 30, 50, 100]
            },
            VDataTableServer: {
                itemsPerPageOptions: [5, 10, 20, 30, 50, 100]
            },
            VPagination: {
                pageCount: 1
            }
        }
    })

    app.use(i18n)
    app.use(vuetify)
}

export default vuetify
