import { defineStore } from 'pinia'
import { httpRequest } from '@/services/api'
import { objectToQueryString } from '@/utils/formDataHandler'

export const useLogsStore = defineStore('logs', {
    state: () => ({
        firstLoad: true,
        logsList: [],
        logsFile: {},
        logsFiles: []
    }),
    getters: {
        getSelectedFile: (state) => {
            if (Array.isArray(state.logsFile) && state.logsFile.length > 0) {
                if (state.logsFile[0] && state.logsFile[0].files) {
                    state.logsFiles = state.logsFile[0].files
                    if (Array.isArray(state.logsFiles) && state.logsFiles.length > 0) {
                        return state.logsFiles[0]
                    }
                }
            }
            return null
        }
    },
    actions: {
        async getLogsFile() {
            await httpRequest('/log-viewer/api/folders?direction=asc').then((response) => {
                this.logsFile = response
                this.firstLoad = false
                this.getLogsList()
            })
        },
        async getLogsList(file, options) {
            const identifier = file || this.getSelectedFile.identifier
            const queryString = options || null
            let params = ''
            this.firstLoad = false
            if (queryString != null) params = objectToQueryString(queryString)

            await httpRequest(`/log-viewer/api/logs?${params}&file=${identifier}&direction=asc`).then(
                (response) => {
                    this.logsList = response.logs
                }
            )
        }
    }
})
