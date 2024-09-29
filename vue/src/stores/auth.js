import { defineStore } from 'pinia'
import storage from '@/composables/useStorage'
import { setCookie, removeCookie } from '@/composables/useCookies'
import { encrypt, decrypt } from '@/utils/crypto'
import { showAlert } from '@/composables/useAlert'
import { httpRequest } from '@/services/api'
import router from '@/router'

const currentUser = JSON.parse(storage.get('user'))

let permissions = []

function loadPermissions() {
    const storedPermissions = storage.get('permissions')
    if (!storedPermissions) {
        console.error('No permissions found in storage.')
        return
    }

    try {
        const permissionsDecrypted = JSON.parse(storedPermissions)
        if (!permissionsDecrypted || typeof permissionsDecrypted !== 'object')
            throw new Error('Invalid permissions data.')
        permissions = decrypt(permissionsDecrypted)
    } catch (error) {
        console.error('Error processing permissions:', error.message)
    }
}

loadPermissions()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: currentUser ? true : false,
        isLoading: false,
        user: currentUser ?? {},
        permissions: permissions ?? []
    }),
    getters: {},
    actions: {
        async signIn(form) {
            this.isLoading = true
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await httpRequest('/login', { method: 'POST', data: form })
                    const { user, token } = response.data
                    this.isLoggedIn = true
                    setCookie('token', token)
                    storage.set('user', JSON.stringify(user))
                    this.user = user
                    const encryptedPermissions = encrypt(user.permissions)
                    storage.set('permissions', JSON.stringify(encryptedPermissions))
                    router.push('/')
                    resolve() // Resolve promise after successful login
                } catch (error) {
                    console.error(error)
                    reject(error)
                } finally {
                    this.isLoading = false
                }
            })
        },

        async getUser() {
            this.isLoading = true
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await httpRequest('/me', { method: 'GET' })
                    const { user } = response.data
                    this.isLoggedIn = true
                    this.user = user
                    resolve() // Resolve promise after successful login
                } catch (error) {
                    console.error(error)
                    reject(error)
                } finally {
                    this.isLoading = false
                }
            })
        },

        async updateUser(data) {
            this.isLoading = true
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await httpRequest('/update-profile', { method: 'POST', data })
                    const user = response.data
                    this.user = user
                    storage.set('user', JSON.stringify(user))
                    showAlert(response.message, 'success')
                    resolve()
                } catch (error) {
                    console.error(error)
                    showAlert(error.message)

                    reject(error)
                } finally {
                    this.isLoading = false
                }
            })
        },

        flush() {
            storage.remove('user', 'permissions')
            removeCookie('token')
            this.user = {}
            this.isLoggedIn = false
            router.push('/login')
        },
        async logOut() {
            this.isLoading = true
            return new Promise(async (resolve, reject) => {
                try {
                    await httpRequest('/logout', { method: 'POST' }).then(() => {
                        this.flush()
                        resolve()
                    })
                } catch (error) {
                    console.error(error)
                    reject(error)
                } finally {
                    this.isLoading = false
                }
            })
        }
    }
})
