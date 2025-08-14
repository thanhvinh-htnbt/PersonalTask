const Task = require('../models/Task');

const createTask = async (taskData) => {
    return await Task.create(taskData);
};

const findTaskById = async (taskId) => {
    return await Task.findById(taskId);
};

const findTasksByUserId = async (userId) => {
    return await Task.find({ userId }).sort({ createdAt: -1 });
};

const updateTask = async (taskId, updateData) => {
    return await Task.findByIdAndUpdate(taskId, updateData, {
        new: true,
        runValidators: true
    });
};

const deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

module.exports = {
    createTask,
    findTaskById,
    findTasksByUserId,
    updateTask,
    deleteTask
};