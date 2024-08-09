import { rest } from 'msw'

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

const mockProjects = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description of Project Test',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    created_by: 'user-123',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Description of Project Test',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    created_by: 'user-123',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
]

const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description of Task 1',
    status: 'pending',
    priority: 'high',
    deadline: '2024-08-10',
    project: '1',
    assigned_to: 'user-123',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Task 1',
    description: 'Description of Task 2',
    status: 'completed',
    priority: 'high',
    deadline: '2024-08-10',
    project: '1',
    assigned_to: 'user-123',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Task 1',
    description: 'Description of Task 2',
    status: 'completed',
    priority: 'high',
    deadline: '2024-08-10',
    project: '2',
    assigned_to: 'user-123',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
]
