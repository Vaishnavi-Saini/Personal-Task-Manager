 import React from 'react'

 function FilterBar({ filter, onFilterChange, totalTasks, completedTasks }) {
    return (
        <div className="filter-bar">
            <div className="task-count">
                <span>Active: {totalTasks - completedTasks}</span>
                <span>Completed: {completedTasks}</span>
                <span>Total: {totalTasks}</span>
            </div>
            <div className="filter-button">
                <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => onFilterChange('active')}
                >All</button>
                <button 
                className={filter === 'active' ? 'active' : ''}
                onClick={() => onFilterChange('active')}
                >Active</button>
                <button 
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => onFilterChange('completed')}
                >Completed</button>
            </div>
        </div>
    )
 }

 export default FilterBar