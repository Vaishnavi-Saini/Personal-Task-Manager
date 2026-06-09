const express = require('express')
const cors = require('cors')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running!'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
