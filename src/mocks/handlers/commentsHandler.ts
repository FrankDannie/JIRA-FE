import { rest } from 'msw'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getCommentsHandler = [
  rest.get(`${API_BASE_URL}/projects/:projectId/tasks/:taskId/comments/`, (req, res, ctx) => {
    const { projectId, taskId } = req.params

    // Example response data
    const comments = [
      { id: 1, content: 'Comment 1', projectId, taskId },
      { id: 2, content: 'Comment 2', projectId, taskId },
    ]

    return res(ctx.status(200), ctx.json(comments))
  }),
]

export const createCommentsHandler = [
  rest.post(`${API_BASE_URL}/projects/:projectId/tasks/:taskId/comments/`, (req, res, ctx) => {
    const { projectId, taskId } = req.params
    const { content } = req.body as { content: string }

    // Example response data
    const newComment = { id: 3, content, projectId, taskId }

    return res(ctx.status(201), ctx.json(newComment))
  }),
]

export const updateCommentHandler = [
  rest.put(`${API_BASE_URL}/projects/:projectId/tasks/:taskId/comments/`, (req, res, ctx) => {
    const { projectId, taskId } = req.params
    const { content } = req.body as { content: string }

    // Example response data
    const updatedComment = { id: 1, content, projectId, taskId }

    return res(ctx.status(200), ctx.json(updatedComment))
  }),
]
