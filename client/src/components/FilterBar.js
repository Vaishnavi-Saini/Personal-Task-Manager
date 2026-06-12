 import React from 'react'

 function FilterBar({ filter, onFilterChange, totalTasks, completedTasks }) {
    return (
        <div className="filter-bar">
            <div className="task-count">
                <span>Active: {totalTasks - completedTasks}</span>
                <span>Completed: {completedTasks}</span>
                <span>Total: {totalTasks}</span>
            </div>
            <div className="filter-buttons">
                <button
                className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => onFilterChange('all')}
                >All</button>
                <button 
                className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => onFilterChange('active')}
                >Active</button>
                <button 
                className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => onFilterChange('completed')}
                >Completed</button>
            </div>
        </div>
    )
 }

 export default FilterBar