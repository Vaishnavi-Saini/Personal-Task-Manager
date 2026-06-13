# Personal-Task-Manager
A full-stack task management application built with Node.js + Express (backend) and React (frontend) as a part of the studio Graphene Associate Software Engineer assessment.

## Live Demo
- Frontend: https://personal-task-manager-rho-sable.vercel.app
- Backend: https://personal-task-manager-production-7ba4.up.railway.app

## Tech Stack

### Frontend 
- **React** - UI library for building components
- **CSS** - Custom styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework for REST API
- **fs (File System)** - Built-in Node.js module for JSON persistence

## Features
- Add tasks with title, description and due date
- View all tasks sorted by newest first
- Mark tasks complete or incomplete
- Edit existing tasks
- Delete tasks with confirmation
- Filter tasks by All, Active, Completed
- Search tasks by title
- Overdue tasks highlighted in red
- Tasks persist after server restart (JSON file)
- Responsive design for mobile and desktop

## Project Structure

```
personal-task-manager/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── TaskForm.js  # Form to add new tasks
│       │   ├── TaskCard.js  # Individual task display
│       │   ├── TaskList.js  # List of all tasks
|       │   └── FilterBar.js # Filter and search bar
│       ├── App.js           # Main component
│       └── App.css          # All styles
├── SERVER/                  # Node.js backend
│   ├── routes/
│   │   └── tasks.js         # All task API routes
│   ├── data.json            # Task persistence storage
│   └── index.js             # Express server entry point
└── README.md
```

## How to Run Locally

### Prerequisites
- Node.js installed

### Step 1 - Clone the repository
git clone https://github.com/Vaishnavi-Saini/Personal-Task-Manager.git
cd Personal-Task-Manager

### Step 2 - Start the Backend
cd SERVER
npm install
npm run dev
Server runs on http://localhost:5000

### Step 3 - Start the Frontend
Open a new terminal:
cd client
npm install
npm start
Frontend runs on http://localhost:3000

## API Documentation

### Base URL
http://localhost:5000/api

### Endpoints

| Method | Path       | Description     |
|--------|------------|-----------------|
| GET    | /tasks     | Get all tasks   |
| POST   | /tasks     | Create new task |
| PUT    | /tasks/:id | Update a task   |
| DELETE | /tasks/:id | Delete a task   |

### Request & Response Examples

**POST /tasks**

```
Request body:
{
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2026-06-13"
}
Response:
{
  "id": "1749123456789",
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2026-06-13",
  "completed": false,
  "createdAt": "2026-06-12T10:00:00.000Z"
}
```

**PUT /tasks/:id**

```
Request body:
{
  "completed": true
}
Response: Updated task object
```

**DELETE /tasks/:id**
```
Response:
{
  "message": "Task deleted successfully"
}
```

## Next Steps
- Add user authentication
- Add task priorities (High, Medium, Low)
- Add drag and drop reordering
- Add due date reminders
- Improve test coverage
- Add dark mode

## Honest Notes
- AI tools were used for guidance during development
- All code has been reviewed and understood
- Tasks are stored in a JSON file for simplicity
- No authentication as per assessment requirements