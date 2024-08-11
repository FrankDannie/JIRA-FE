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

export const createProjectHandler = [
  rest.post(`${API_BASE_URL}/projects/`, (req, res, ctx) => {
    // Extract data from the request body
    const { name, description, start_date, end_date } = req.body as {
      name: string
      description: string
      start_date: string
      end_date: string
    }

    // Example response with a created project
    return res(
      ctx.status(201),
      ctx.json({
        id: '123',
        name,
        description,
        start_date,
        end_date,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    )
  }),
]

export const updateProjectHandler = [
  rest.put(`${API_BASE_URL}/projects/:projectId/`, (req, res, ctx) => {
    const { projectId } = req.params
    const { name, description, start_date, end_date } = req.body as {
      name: string
      description: string
      start_date: string
      end_date: string
    }

    // Example response with an updated project
    return res(
      ctx.status(200),
      ctx.json({
        id: projectId,
        name,
        description,
        start_date,
        end_date,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
      }),
    )
  }),
]
