import { defineStore } from 'pinia'
import { httpRequest } from '@/services/api'
import { showAlert } from '@/composables/useAlert'

export const useRolesStore = defineStore('roles', {
    state: () => ({
        roles: [],
        permissions: [],
        permissionsSorted: []
    }),
    getters: {
        getPermissionsSorted: (state) => {
            const groupedPermissions = state.permissions.reduce((acc, permission) => {
                // Check if the group already exists in the accumulator
                if (!acc[permission.group]) {
                    // If not, create a new array for the group
                    acc[permission.group] = []
                }
                // Add the current permission to the group's array
                acc[permission.group].push(permission)
                state.permissionsSorted = acc
                return acc
            }, {})
            const groupedPermissionsArray = Object.keys(groupedPermissions).map((group) => ({
                group,
                permissions: groupedPermissions[group]
            }))
            return groupedPermissionsArray
        },
        getRolesSorted: (state) => {
            return state.roles.map((item) => item.name)
        }
    },
    actions: {
        async getRoles() {
            await httpRequest('/roles').then((response) => {
                this.roles = response.data
            })
        },
        async getPermissions() {
            await httpRequest('/permissions').then((response) => {
                this.permissions = response.data
            })
        },
        async getSearchRoles(data) {
            await httpRequest('/roles', { params: { search: data } }).then((response) => {
                this.roles = response.data
            })
        },
        async createRole(data) {
            await httpRequest('/roles', { method: 'POST', data })
                .then((response) => {
                    this.roles.push(response.data)
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    showAlert(error.message)
                })
        },
        async updateRole(data) {
            await httpRequest(`/roles/${data.id}`, { method: 'POST', data })
                .then((response) => {
                    const roleIndex = this.roles.findIndex((role) => role.id === data.id)
                    this.roles[roleIndex] = response.data
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    showAlert(error.message)
                })
        },
        async deleteRole(id) {
            await httpRequest(`/roles/${id}`, { method: 'DELETE' })
                .then((response) => {
                    this.roles = this.roles.filter((role) => role.id !== id)
                    showAlert(response.message, 'success')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
})
