// directives/permission.js
import { useAuthStore } from '@/stores/auth'

export const permissionDirective = {
    beforeMount(el, binding) {
        const authStore = useAuthStore()
        const permission = binding.value

        if (!authStore.permissions.includes(permission)) {
            el.style.display = 'none'
        }
    }
}
