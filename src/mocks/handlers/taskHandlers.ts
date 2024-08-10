import { rest } from 'msw'
import { mockTasks } from '../mockdata'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

interface Task {
  title: string
  description: string
  status: string
  priority: string
  deadline: string
  assigned_to: string
}

// Mock get task details handler
export const getTaskDetailsHandler = [
  rest.get(`${API_BASE_URL}/projects/:projectId/tasks/:taskId/`, (req, res, ctx) => {
    const { projectId, taskId } = req.params
    const task = mockTasks.find((t) => t.project === projectId && t.id === taskId)

    if (task) {
      return res(ctx.status(200), ctx.json(task))
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Task not found' }))
    }
  }),
]

export const updateTaskHandler = [
  rest.put(`${API_BASE_URL}/projects/:projectId/tasks/:taskId/`, (req, res, ctx) => {
    const { projectId, taskId } = req.params
    const { title, description, status, priority, deadline, assigned_to } = req.body as Task

    const taskIndex = mockTasks.findIndex((t) => t.project === projectId && t.id === taskId)

    if (taskIndex !== -1) {
      mockTasks[taskIndex] = {
        ...mockTasks[taskIndex],
        title,
        description,
        status,
        priority,
        deadline,
        assigned_to,
      }
      return res(ctx.status(200), ctx.json(mockTasks[taskIndex]))
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Task not found' }))
    }
  }),
]
