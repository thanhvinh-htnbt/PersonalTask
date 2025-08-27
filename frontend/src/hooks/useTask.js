import { useState, useEffect, useCallback } from 'react';
import * as tasksApi from '../api/tasksApi';

export const useTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await tasksApi.getTasks();
            setTasks(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const getTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await tasksApi.getTasks();
            return data;
        } catch (err) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    },[]);

    const createTask = async (taskData) => {
        setLoading(true);
        setError(null);
        try {
            const newTask = await tasksApi.createTask(taskData);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId, taskData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTask = await tasksApi.updateTask(taskId, taskData);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            await tasksApi.deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    const getTaskById = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            const task = await tasksApi.getTaskById(taskId);
            return task;
        } catch (err) {
            setError(err);
            throw err; // Re-throw to handle it in the component
        } finally {
            setLoading(false);
        }
    };
    return {
        tasks,
        loading,
        error,
        fetchTasks,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
    };
};