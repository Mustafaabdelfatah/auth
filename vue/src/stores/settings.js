import { defineStore } from 'pinia'
import { httpRequest } from '@/services/api'
import { useAppSettings } from '@/composables/useAppSettings'
import { showAlert } from '@/composables/useAlert'
import storage from '@/composables/useStorage'
const lang = storage.get('locale')
export const useSettingsStore = defineStore('settings', {
    state: () => ({
        mail_server: [],
        properties: [],
        support: [],
        theme: [],
        appName: '' || 'Wakeb'
    }),
    getters: {
        getProperties(state) {
            const properties = {}
            state.properties.forEach((property) => {
                properties[property.key] = property.value
            })
            const { updateFavicon, updateTitle } = useAppSettings()
            updateFavicon(properties['website_favorite_place_icon'])
            return properties
        }
    },
    actions: {
        async getSettings() {
            await httpRequest('/settings')
                .then((response) => {
                    const { mail_server, properties, support, theme } = response.data
                    this.mail_server = mail_server
                    this.properties = properties
                    this.support = support
                    this.theme = theme
                    this.getProperties
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        async updateSettings(data) {
            await httpRequest('/set-settings', {
                method: 'POST',
                data,
                isFile: true
            })
                .then((response) => {
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    showAlert(error.message)
                    console.error(error)
                })
        }
    }
})
