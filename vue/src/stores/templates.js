import { defineStore } from 'pinia';

export const useTemplate = defineStore('template', {
    state: () => ({
        templateType: 'sms',
        templateID: null,
        taskInfo: null,
        task_points: []
    }),
    actions: {
        templateActions() {
            console.log('templateType., templateType');
        }
    }
})
