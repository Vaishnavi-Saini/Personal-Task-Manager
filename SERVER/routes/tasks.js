const express = require('express') 
const router = express.Router()

let tasks = []
let nextId = 1

//GET all tasks
router.get('/', (req, res) => {
    const sorted = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    res.json(sorted)
})

//POST Create new task
router.post('/', (req, res) => {
    const { title, description, dueDate } = req.body

    if(!title){
        return res.status(400).json({ error: 'Title is required.'})
    }
  
    const newTask = {
        id: nextId++,
        title,
        description : description || '',
        dueDate: dueDate || null,
        completed : false,
        createdAt : new Date().toISOString()
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
})

//PUT update a task
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const task = tasks.find(t => t.id ===id)

    if(!task){
        return res.status(404).json({ error: 'Task not found '})
    }

    const { title, description, dueDate, completed } = req.body

    if (title !== undefined) task.title = title
    if (description !== undefined) task.description = description
    if (dueDate !== undefined) task.dueDate = duesDate
    if (completed !== undefined) task.completed = completed

    res.json(task)
})

// DELETE a task
router.delete('/:id', (req, res) => {
    const id =parseInt(req.params.id)
    const index = tasks.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' })
    }

    tasks.splice(index, 1)
    res.json({ message: 'Task deleted successfully' })
})

module.exports = router

