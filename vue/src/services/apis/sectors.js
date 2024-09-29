import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getSectors = async (options) => {
    try {
        const response = await httpRequest('/sections', {params: options});;
        return response.data;
    } catch (error) {
        console.error('Error fetching Sectors:', error);
        throw error;
    }
};

const getSectorById = async (id) => {
    try {
        const response = await httpRequest(`/sectors/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Sector with id ${id}:`, error);
        throw error;
    }
};

const createSector = async (data) => {
    try {
        const response = await httpRequest('/sections', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        console.error(error.message, error);
        throw error;
    }
};

const updateSector = async (id, data) => {
    try {
        const response = await httpRequest(`/sections/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        console.error(`Error updating Sector with id ${id}:`, error);
        throw error;
    }
};

const deleteSector = async (id) => {
    try {
        const response = await httpRequest(`/sections/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};

export {
    getSectors,
    getSectorById,
    createSector,
    updateSector,
    deleteSector
};
