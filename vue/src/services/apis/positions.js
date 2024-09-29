import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getPositions = async (options) => {
    try {
        const response = await httpRequest('/positions', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPositionById = async (id) => {
    try {
        const response = await httpRequest(`/positions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createPosition = async (data) => {
    try {
        const response = await httpRequest('/positions', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updatePosition = async (id, data) => {
    try {
        const response = await httpRequest(`/positions/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deletePosition = async (id) => {
    try {
        const response = await httpRequest(`/positions/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
};
