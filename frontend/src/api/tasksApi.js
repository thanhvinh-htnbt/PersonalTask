import axios from 'axios';

const API_URL = `${import.meta.env.API_URL}/tasks`;

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
