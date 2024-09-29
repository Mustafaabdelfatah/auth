import { httpRequest } from '@/services/api';

const getGenerals = async (queryParams) => {
    try {
        const url = `/help-models`;
        const response = await httpRequest(url, { method: 'GET' }, queryParams);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getEnumsGenerals = async (queryParams) => {
    try {
        const url = `/help-enums`;
        const response = await httpRequest(url, { method: 'GET' }, queryParams);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export {
    getGenerals,
    getEnumsGenerals
};
