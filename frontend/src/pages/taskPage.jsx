import { useState } from 'react';
import { useTask } from '../hooks/useTask';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import TaskFormModal from '../components/taskFormModal';
import TaskItem from '../components/TaskItem';

const TaskPage = () => {
    const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTask();
    const [currentTask, setCurrentTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

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
                await updateTask(currentTask._id, task);
            } else {
                await createTask(task);
            }
            setShowModal(false);
            fetchTasks();
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="p-6 bg-blue-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center text-black">Task Management</h1>
            <div className="relative flex justify-center items-center mb-6">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-25 h-10" onClick={handleAdd}>Add Task</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md absolute right-0  w-25 h-10" onClick={handleLogout}>Logout</button>
            </div>
            <div className="flex justify-center items-center mb-6">
                
            </div>            
            {showModal && (
                <TaskFormModal
                    task={currentTask}
                    onSubmit={handleSave}
                    onCancel={() => setShowModal(false)}
                />
            )}
            <div className="flex flex-wrap gap-4 justify-center">
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onUpdate={() => handleUpdate(task)}
                        onDelete={() => handleDelete(task._id)}
                    />
                ))}
            </div>
            
        </div>
    );

};

export default TaskPage;