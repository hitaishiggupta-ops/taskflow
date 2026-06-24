# TaskFlow Backend API Documentation

## Authentication

### Register
POST /api/auth/register

### Login
POST /api/auth/login

---

## Boards

### Create Board
POST /api/boards

### Get Boards
GET /api/boards

### Update Board
PUT /api/boards/:id

### Delete Board
DELETE /api/boards/:id

---

## Tasks

### Create Task
POST /api/tasks

### Get Tasks
GET /api/tasks/:boardId

### Get Single Task
GET /api/tasks/task/:id

### Update Task
PUT /api/tasks/:id

### Delete Task
DELETE /api/tasks/:id

### Move Task Status
PATCH /api/tasks/:id/status

### Search Tasks
GET /api/tasks/search/all?keyword=login

### Overdue Tasks
GET /api/tasks/overdue/all

---

## Dashboard

GET /api/dashboard/stats

---

## AI

POST /api/ai/suggest

---

## Health Check

GET /health