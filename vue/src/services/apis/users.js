import {httpRequest} from '@/services/api';
import {showAlert} from '@/composables/useAlert';


const getUsers = async (options) => {
    try {
        const response = await httpRequest('/users', {params: options});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUsersById = async (id) => {
    try {
        const response = await httpRequest(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createUsers = async (data) => {
    try {
        const response = await httpRequest('/users', {method: 'POST', data, isFile: true});
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateUsers = async (id, data) => {
    try {
        const response = await httpRequest(`/users/${id}`, {method: 'PUT', data, isFile: true});
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const deleteUsers = async (id) => {
    try {
        const response = await httpRequest(`/users/${id}`, {method: 'DELETE'});
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

const updateProfile = async (data) => {
    try {
        const response = await httpRequest('/update-profile', {method: 'POST', data, isFile: true});
        showAlert(response.message, 'success')
        return response.data;
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
};

export {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    updateProfile
};
