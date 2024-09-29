import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getTemplates = async (options) => {
    try {
        const response = await httpRequest('/templates', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTemplateById = async (id) => {
    try {
        const response = await httpRequest(`/templates/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createTemplate = async (data) => {
    try {
        const response = await httpRequest('/templates', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateTemplate = async (id, data) => {
    try {
        const response = await httpRequest(`/templates/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteTemplate = async (id) => {
    try {
        const response = await httpRequest(`/templates/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
};
