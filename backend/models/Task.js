const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required']
    },

    description: {
        type: String,
        required: [true, 'Task description is required']
    },

    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },

    deadline: {
        type: Date,
        required: [true, 'Task deadline is required']
    }
});

taskSchema.pre('save', function(next) {
    if (this.isNew && !this.deadline) {
        this.deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    }
    next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
