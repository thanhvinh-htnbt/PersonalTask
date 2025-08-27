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
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
            <div className="border bg-white p-8 rounded-lg shadow-2xl w-11/12 max-w-lg transform transition-all duration-300 scale-100">
                <h3 className="text-2xl font-bold mb-4 text-center">{task ? "Update Task" : "Add New Task"}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Task Name:</label>
                            <input className="w-3/4 ml-4 border rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea className="w-full grid grid-rows-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="flex justify-between items-center mx-auto">
                            <div>
                                <label>Status:</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label>Deadline:</label>                            
                                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            </div>
                        </div> 
                        <div className="flex justify-center items-center space-x-4 mt-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-25 h-10" type="submit">Save</button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-25 h-10" type="button" onClick={onCancel}>Cancel</button>
                        </div>       
                        
                    </div>                    
                </form>
            </div>
        </div>
    );
}

export default TaskFormModal;