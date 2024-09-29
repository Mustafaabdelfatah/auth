import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getScenarios = async (options) => {
    try {
        const response = await httpRequest('/logics', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getScenarioById = async (id) => {
    try {
        const response = await httpRequest(`/logics/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getScenarioTree = async (id) => {
    try {
        const response = await httpRequest(`/logics/${id}/tree`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createScenario = async (data) => {
    try {
        const response = await httpRequest('/logics', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateScenario = async (id, data) => {
    try {
        const response = await httpRequest(`/logics/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteScenario = async (id) => {
    try {
        const response = await httpRequest(`/logics/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};


const assignScenario = async (data) => {
    try {
        const response = await httpRequest('/logic/sync-operations', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};


const scenarioOperations = async () => {
    try {
        const response = await httpRequest('/models/operations');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getScenarios,
    getScenarioById,
    getScenarioTree,
    createScenario,
    updateScenario,
    deleteScenario,
    assignScenario,
    scenarioOperations
};
