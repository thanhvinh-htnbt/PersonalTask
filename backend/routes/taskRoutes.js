const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.use(authMiddleware.authMiddleware);

router.post('', taskController.createTask);

router.get('', taskController.findTasksByUserId);

router.get('/:id', taskController.findTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;