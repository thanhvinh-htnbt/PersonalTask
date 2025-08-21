import api from './index';

const API_URL = '/auth';

export const register = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const login = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.post(`${API_URL}/refresh-token`, { refreshToken: localStorage.getItem('refreshToken') });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};