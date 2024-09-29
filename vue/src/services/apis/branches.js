import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getBranches = async (options) => {
    try {
        const response = await httpRequest('/branches', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getBranchById = async (id) => {
    try {
        const response = await httpRequest(`/branches/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createBranch = async (data) => {
    try {
        const response = await httpRequest('/branches', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateBranch = async (id, data) => {
    try {
        const response = await httpRequest(`/branches/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteBranch = async (id) => {
    try {
        const response = await httpRequest(`/branches/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
