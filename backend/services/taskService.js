const taskRepository = require('../repositories/taskRepository');
const userRepository = require('../repositories/userRepository');

const createTask = async (taskData) => {
    const user = await userRepository.findUserById(taskData.userId);
    if (!user) {
        throw new Error('User not found');
    }
    return await taskRepository.createTask(taskData);
};

const findTaskById = async (taskId) => {
    const task = await taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

const findTasksByUserId = async (userId) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return await taskRepository.findTasksByUserId(userId);
};

const updateTask = async (taskId, updateData) => {
    const task = await taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    return await taskRepository.updateTask(taskId, updateData);
};

const deleteTask = async (taskId) => {
    const task = await taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    return await taskRepository.deleteTask(taskId);
};

module.exports = {
    createTask,
    findTaskById,
    findTasksByUserId,
    updateTask,
    deleteTask
};