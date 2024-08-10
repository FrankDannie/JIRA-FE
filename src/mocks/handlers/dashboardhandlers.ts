import { rest } from 'msw'
import { mockProjects, mockTasks } from '../mockdata'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

// Mock get project overview handler
export const projectOverviewHandler = [
  rest.get(`${API_BASE_URL}/projects/:projectId/`, (req, res, ctx) => {
    const { projectId } = req.params
    const project = mockProjects.find((p) => p.id === projectId)

    if (project) {
      return res(ctx.status(200), ctx.json(project))
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Project not found' }))
    }
  }),
]

// Mock get all projects handler
export const allProjectsHandler = [
  rest.get(`${API_BASE_URL}/projects/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProjects))
  }),
]

// Mock get tasks for a project handler
export const tasksForProjectHandler = [
  rest.get(`${API_BASE_URL}/projects/:projectId/tasks/`, (req, res, ctx) => {
    const { projectId } = req.params
    const tasks = mockTasks.filter((t) => t.project === projectId)

    if (tasks.length > 0) {
      return res(ctx.status(200), ctx.json(tasks))
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Tasks not found for this project' }))
    }
  }),
]
