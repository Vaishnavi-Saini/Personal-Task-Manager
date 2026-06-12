import React, { useState } from 'react'

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!title.trim()) {
            alert('Title is required!')
            return
        }

        const newTask = { title, description, dueDate }

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            })

            const savedTask = await response.json()
            onTaskAdded(savedTask)

            setTitle('')
            setDescription('')
            setDueDate('')
        }   catch (error) {
            alert('Something went wrong. Is the server running?')
        }
    }

    return (
        <div className="task-form">
            <h2>Add New Task</h2>
            <div className="form-group">
        <input
          type="text"
          placeholder="Task title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Due Date (optional)</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        </div>
      <button className="add-task-btn" onClick={handleSubmit}>Add Task</button>
    </div>
  )
}

export default TaskForm
