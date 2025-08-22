
const TaskItem = ({ task, onUpdate, onDelete }) => {
    return (
        <div className="task-item">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>        
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;