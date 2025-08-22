import React, { useState, useEffect } from 'react';
import { useTask } from '../hooks/useTask';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const taskApi = useTask();

    const handleAdd = () => {
        setCurrentTask(null);
        setShowModal(true);
    };

    const handleUpdate = (task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    const handleSave = async (task) => {
        try {
            if (currentTask) {
                const updatedTask = await taskApi.updateTask(currentTask.id, task);
                setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
            } else {
                const newTask = await taskApi.createTask(task);
                setTasks([...tasks, newTask]);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await taskApi.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskApi.getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        fetchTasks();
    }, [taskApi]);

    return (
        <div>
            <h1>Task Management</h1>
            <button onClick={handleAdd}>Add Task</button>
            {showModal && (
                <TaskFormModal
                    task={currentTask}
                    onSubmit={handleSave}
                    onCancel={() => setShowModal(false)}
                />
            )}
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={() => handleUpdate(task)}
                    onDelete={() => handleDelete(task.id)}
                />
            ))}
        </div>
    );

};

export default TaskPage;