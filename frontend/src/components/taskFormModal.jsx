import React, { useState, useEffect } from 'react';

const TaskFormModal = ({ task, onSubmit, onCancel }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            setStatus(task.status);
            setDeadline(task.deadline);
        } else {
            setName("");
            setDescription("");
            setStatus("pending");
            setDeadline("");
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            name,
            description,
            status,
            deadline: new Date(deadline).toISOString(),
        };
        onSubmit(updatedTask);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{task ? "Update Task" : "Add New Task"}</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default TaskFormModal;