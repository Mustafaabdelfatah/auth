import { defineStore } from 'pinia'
import storage from '@/composables/useStorage'
import { useAuthStore } from '@/stores/auth'
import { showAlert } from '@/composables/useAlert'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLoading: false,
        cardLoading: false,
        buttonLoading: false,
        isCreate: true,
        step: 1,
        mode: storage.get('mode') || 'light',
        drawer: true,
        drawerRail: false,
        drawerTitlesShow: true,
        hoverDrawerPrevent: true,
        drawerWith: '95',
        auth: {
            homeURL: '/dashboard'
        },
        locale: {
            default: import.meta.env.VITE_LOCALE,
            current: storage.get('locale') || import.meta.env.VITE_LOCALE
        }
    }),
    actions: {
        openDrawer() {
            if (mdAndDown.value) {
                appStore.drawer = !appStore.drawer
            } else {
                appStore.drawerRail = !appStore.drawerRail
                appStore.hoverDrawerPrevent = !appStore.hoverDrawerPrevent
                appStore.drawerTitlesShow = !appStore.drawerTitlesShow
                if (!appStore.drawerRail) {
                    appStore.drawerTitlesShow = true
                }
            }
        },
        handleMouseEnter() {
            if (!this.hoverDrawerPrevent) {
                this.drawerTitlesShow = true
                this.drawerWith = '260'
            }
        },
        handleMouseLeave() {
            if (!this.hoverDrawerPrevent) {
                this.drawerTitlesShow = false
                this.drawerWith = '95'
            }
        }
    }
})
