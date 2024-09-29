import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getLogicTask = async (options) => {
    try {
        const response = await httpRequest('logics/tasks', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getLogicTaskById = async (id) => {
    try {
        const response = await httpRequest(`logics/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createLogicTask = async (id, data) => {
    try {
        const response = await httpRequest(`logic/${id}/task`, { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateLogicTask = async (id, data) => {
    try {
        const response = await httpRequest(`logic/${id}/task`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteLogicTask = async (id, data) => {
    try {
        const response = await httpRequest(`logics/tasks/${id}`, { method: 'DELETE', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const logicTaskRelations = async (childID, data) => {
    try {
        const response = await httpRequest(`logics/task/${childID}/assign-relation`, { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const logicTaskPositions = async (childID, data) => {
    try {
        const response = await httpRequest(`logics/task/${childID}/update-position`, { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getLogicTask,
    getLogicTaskById,
    createLogicTask,
    updateLogicTask,
    deleteLogicTask,
    logicTaskRelations,
    logicTaskPositions
};
