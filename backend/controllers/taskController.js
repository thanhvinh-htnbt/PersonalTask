const taskService = require('../services/taskService');

const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        taskData.userId = req.user._id; 
        const task = await taskService.createTask(taskData);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const findTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findTaskById(taskId);
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const findTasksByUserId = async (req, res) => {
    try {
        const userId = req.user._id; 
        const tasks = await taskService.findTasksByUserId(userId);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;
        const updatedTask = await taskService.updateTask(taskId, updateData);
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.deleteTask(taskId);
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTask,
    findTaskById,
    findTasksByUserId,
    updateTask,
    deleteTask
};