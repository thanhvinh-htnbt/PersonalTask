
const TaskItem = ({ task, onUpdate, onDelete }) => {
    return (
        <div className="task-item border p-4 mb-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-2xl font-bold flex justify-center">{task.name}</h3>
            <p className="flex justify-center">{task.description}</p>
            <p className="flex justify-center">Status: {task.status}</p>
            <p className="flex justify-center">Deadline: {new Date(task.deadline).toLocaleDateString()}</p> 
            <div className="flex justify-center items-center px-4 py-2 space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md w-25 h-10" onClick={onUpdate}>Update</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-25 h-10" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;