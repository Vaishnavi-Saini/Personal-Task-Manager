const express = require('express') 
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '..', 'data.json')

const readTasks = () => {
    try {
    const data = fs.readFileSync(dataPath, 'utf-8')
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

const writeTasks = (tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2))
}

//GET all tasks
router.get('/', (req, res) => {
    const tasks = readTasks()
    const sorted = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    res.json(sorted)
})

//POST Create new task
router.post('/', (req, res) => {
    const tasks = readTasks()
    const { title, description, dueDate } = req.body

    if(!title){
        return res.status(400).json({ error: 'Title is required.'})
    }
  
    const newTask = {
        id: Date.now().toString(),
        title,
        description : description || '',
        dueDate: dueDate || null,
        completed : false,
        createdAt : new Date().toISOString()
    }

    tasks.push(newTask)
    writeTasks(tasks)
    res.status(201).json(newTask)
})

//PUT update a task
router.put('/:id', (req, res) => {
    const tasks = readTasks()
    const id = req.params.id
    const index = tasks.findIndex(t => t.id ===id)

    if(index === -1){
        return res.status(404).json({ error: 'Task not found '})
    }

    const { title, description, dueDate, completed } = req.body

    if (title !== undefined) tasks[index].title = title
    if (description !== undefined) tasks[index].description = description
    if (dueDate !== undefined) tasks[index].dueDate = dueDate
    if (completed !== undefined) tasks[index].completed = completed

    writeTasks(tasks)
    res.json(tasks[index])
})

// DELETE a task
router.delete('/:id', (req, res) => {
    const tasks = readTasks()
    const id =req.params.id
    const index = tasks.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' })
    }

    tasks.splice(index, 1)
    writeTasks(tasks)
    res.json({ message: 'Task deleted successfully' })
})

module.exports = router

