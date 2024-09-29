import { defineStore } from 'pinia'

export const useTaskLogics = defineStore('task', {
    state: () => ({
        task: null,
        parentID: null,
        templateID: null,
        taskInfo: null,
        task_points: []
    }),
    actions: {

        taskActions() {
            console.log('taskActions');
        }
    }
})
