import { decrypt } from '@/utils/crypto'

export default function permissionsMiddleware(to, from, next) {
  const encryptedPermissions = localStorage.getItem('permissions')
  try {
    const decryptedPermissions = JSON.parse(encryptedPermissions)
    const userPermissions = decrypt(decryptedPermissions)
    if (to.meta.permissions && to.meta.permissions.length > 0) {
      let isAllowed = userPermissions.some((p) => to.meta.permissions.includes(p))
      if (!isAllowed) return next('/')
    }

    next()
  } catch (error) {
    console.error('Failed to decrypt permissions', error)
    next('/') // Redirect on decryption error
  }
}
