const taskController = require('../controllers/taskController');
const express = require('express');

const router = express.Router();

router.post('/', taskController.createTask);

router.get('/:id', taskController.findTaskById);

router.get('/', taskController.findTasksByUserId);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;