import { httpRequest } from '@/services/api';
import { showAlert } from '@/composables/useAlert';


const getDepartments = async (options) => {
    try {
        const response = await httpRequest('/departments', {params: options});
        return response.data;
    } catch (errors) {
        console.error('Error fetching Departments:', errors);
        throw errors;
    }
};

const getDepartmentsById = async (id) => {
    try {
        const response = await httpRequest(`/departments/${id}`, { method: 'GET'});
        return response.data;
    } catch (error) {
        console.error('Error fetching Departments:', error);
        throw error;
    }
};

const getDepartmentsTasks = async (id) => {
    try {
        const response = await httpRequest(`/department/${id}/tasks-users`, { method: 'GET'});
        return response.data;
    } catch (error) {
        console.error('Error fetching Departments:', error);
        throw error;
    }
};

const createDepartment = async (data) => {
    try {
        const response = await httpRequest('/departments', { method: 'POST', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (errors) {
        showAlert(errors.message, 'error');
        throw errors;
    }
};

const updateDepartment = async (id, data) => {
    try {
        const response = await httpRequest(`/departments/${id}`, { method: 'PUT', data });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteDepartment = async (id) => {
    try {
        const response = await httpRequest(`/departments/${id}`, { method: 'DELETE' });
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getDepartments,
    getDepartmentsById,
    getDepartmentsTasks,
    createDepartment,
    updateDepartment,
    deleteDepartment
};
