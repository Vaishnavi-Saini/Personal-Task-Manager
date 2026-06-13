import React, { useState } from 'react'

function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')

  const handleToggleComplete = async () => {
    const response = await fetch(
      `https://personal-task-manager-production-7ba4.up.railway.app/api/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      }
    )
    const updated = await response.json()
    onUpdate(updated)
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty!')
      return
    }
    const response = await fetch(
      `https://personal-task-manager-production-7ba4.up.railway.app/api/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          dueDate: editDueDate || null
        })
      }
    )
    const updated = await response.json()
    onUpdate(updated)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return
    await fetch(`https://personal-task-manager-production-7ba4.up.railway.app/api/tasks/${task.id}`, {
      method: 'DELETE'
    })
    onDelete(task.id)
  }

  const isOverdue = task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    !task.completed

  if (isEditing) {
    return (
      <div className="task-card">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
        />
        <h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {task.dueDate && (
        <p className={isOverdue ? 'overdue-text' : 'due-date'}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div className="task-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default TaskCard