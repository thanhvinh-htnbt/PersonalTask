const taskController = require('../controllers/taskController');
const express = require('express');

const router = express.Router();

router.post('/new', taskController.createTask);

router.get('', taskController.findTasksByUserId);

router.get('/:id', taskController.findTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;