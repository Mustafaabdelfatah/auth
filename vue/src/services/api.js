import instance from '@/plugins/axios';

export const httpRequest = (url, options = { method: 'GET' }, params = []) => {
    const config = {
        method: options.method || 'GET',
        headers: options.headers || {},
        params: options.method === 'GET' ? params : undefined,
        data: options.method !== 'GET' ? params : undefined,
        ...options
    };

    return instance(url, config);
};
