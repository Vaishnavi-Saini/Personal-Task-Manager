import React from 'react'
import TaskCard from'./TaskCard'

function TaskList({ tasks, onUpdate, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tasks found!</h3>
                <p>Add a new task above to get started</p>
            </div>
        )
    }

    return (
        <div className="task-list">
            {tasks.map(task => ( <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdate}
                onDeleete={onDelete}
                />
            ))}
        </div>
    )
}

export default TaskList
