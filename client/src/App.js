import React, { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks')
      const data = await response.json()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      alert('Cannot connect to server!')
      setLoading(false)
    }
  }

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [newTask, ...prev])
  }

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const handleTaskDelete = (deletedId) => {
    setTasks(prev => prev.filter(task => task.id !== deletedId))
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'active' ? !task.completed :
      filter === 'completed' ? task.completed : true
    
    const matchesSearch = (task.title || '')
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const completedCount = tasks.filter(t => t.completed).length

  if (loading) {
    return <div className="loading">Loading tasks...</div>
  }

  return (
    <div className="app">
      <h1>✅ Personal Task Manager</h1>
      <input 
        className="search-input"
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        totalTasks={tasks.length}
        completedTasks={completedCount}
      />
      <TaskList
        tasks={filteredTasks}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
      />
    </div>
  )
}

export default App