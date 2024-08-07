import { rest } from 'msw'

export const handlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
      ]),
    )
  }),
]
