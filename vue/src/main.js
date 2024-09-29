import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/sass/main.scss'
import vuetify from './plugins/vuetify'
import { configureYup } from '@/utils/yupConfig'
import { permissionDirective } from '@/directives/permission'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import i18n from '@/utils/i18n'



configureYup()
const app = createApp(App)
globalThis.t = i18n.global.t;
app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: 'places'
    }
})
app.directive('permission', permissionDirective)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
