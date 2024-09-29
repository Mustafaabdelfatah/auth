import { defineStore } from 'pinia'
import { httpRequest } from '@/services/api'
import { showAlert } from '@/composables/useAlert'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        user: null,
    }),
    getters: {},
    actions: {
        async getUsers() {
            await httpRequest('/users').then((response) => {
                this.users = response.data
            })
        },
        async getSearchUsers(data) {
            await httpRequest('/users', { params: { search: data } }).then((response) => {
                this.users = response.data
            })
        },
        async deleteUser(id) {
            await httpRequest(`/users/${id}`, { method: 'DELETE' })
                .then((response) => {
                    this.users = this.users.filter((user) => user.id !== id)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        async createUser(data) {
            await httpRequest('/users', { method: 'POST', data, isFile: true })
                .then((response) => {
                    this.users.push(response.data)
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    showAlert(error.message)
                })
        },
        async updateUser(data) {
            await httpRequest(`/users/${data.id}`, { method: 'POST', data, isFile: true })
                .then((response) => {
                    const userIndex = this.users.findIndex((role) => role.id === data.id)
                    this.users[userIndex] = response.data
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    showAlert(error.message)
                })
        }
    }
})
