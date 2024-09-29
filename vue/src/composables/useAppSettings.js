import i18n from '@/utils/i18n'

export function useAppSettings() {
    const updateFavicon = (faviconUrl) => {
        if (!faviconUrl) return

        let link = document.querySelector("link[rel*='icon']")
        if (!link) {
            link = document.createElement('link')
            link.type = 'image/x-icon'
            link.rel = 'shortcut icon'
            document.getElementsByTagName('head')[0].appendChild(link)
        }
        link.href = faviconUrl
    }
    const updateTitle = (to, settingsStore, appStore) => {
        const baseTitle = i18n.global.t(settingsStore.appName)
        document.title = `${baseTitle} - ${i18n.global.t(to?.meta?.name)}`
    }

    return {
        updateFavicon,
        updateTitle
    }
}
