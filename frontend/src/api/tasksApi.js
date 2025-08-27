import api from './index';

const API_URL = '/tasks';

export const getTasks = async () => {
    try {
        const response = await api.get(`${API_URL}`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post(`${API_URL}`, taskData);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await api.put(`${API_URL}/${taskId}`, taskData);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`${API_URL}/${taskId}`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getTaskById = async (taskId) => {
    try {
        const response = await api.get(`${API_URL}/${taskId}`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
