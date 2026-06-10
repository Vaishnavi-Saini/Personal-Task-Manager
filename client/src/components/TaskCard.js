 import React, { useState } from 'react'

 function TaskCard({ task, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDescription, setEditDescription] = useState(task.description)
    const [editDueDate, setEditDueDate] = useState(task.dueDate || '')

    const handleToggleComplete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complete: !task.cpmplete })
            })
            const updated = await response.json()
            onUpdate(updated)
        }   catch (error) {
            alert('Something went wrong!')
        }
    }

    const handleEdit = async () => {
        if (!editTitle.trim()) {
            alert('Title cannot be empty!')
            return
        }
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                    dueDate: editDueDate
                })
            })
            if (!response.ok) {
                alert('Task not found! Please refresh the page.')
                return
            }
            const updated = await response.json()
            onUpdate(updated)
            setIsEditing(false)
        }   catch (error) {
            alert('Something went wrong!')
        }   
    }

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to DELETE this task??')
        if (!confirm) return

        try {
            await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
                method: 'DELETE'
            })
            onDelete(task.id)
        }   catch (error) {
            alert('something went wrong!')
        }
    }

    const isOverdue = task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        !task.completed

    return(
        <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
          {isEditing ? (
            <div className = "edit-form">
                <input
                    typr="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                    value={editDescription}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                />
                <div className="edit-buttons">
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>   
        </div>
    ) : (
        <div className="task-content">
            <div classname="task=header">
                <input
                typr="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                />
                <h3 className={task.complete ? 'strikethrough' : ''}>
                    {task.title}
                </h3>
            </div>
            {task.description && (
               <p className="task-description">{task.description}</p>
            )}  
            {task.dueDate && (
                <p className={isOverdue ? 'overdue-text' : ''}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}
            <div className="task-action">
            <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
            >Edit</button>
            <button 
                className="delete-btn"
                onClick={handleDelete}
            >Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}   
export default TaskCard