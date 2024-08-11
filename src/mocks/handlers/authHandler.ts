import { rest } from 'msw'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
// Mock login handler
export const loginHandler = [
  rest.post(`${API_BASE_URL}/auth/login/`, async (req, res, ctx) => {
    const contentType = req.headers.get('Content-Type') || ''

    let username, password

    if (contentType.includes('application/json')) {
      try {
        ;({ username, password } = await req.json())
      } catch (error) {
        return res(
          ctx.status(400),
          ctx.json({
            detail: 'Invalid JSON format',
          }),
        )
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const parsedBody = Object.fromEntries(new URLSearchParams(await req.text()))
      username = parsedBody.username
      password = parsedBody.password
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Unsupported content type',
        }),
      )
    }

    // Simulate user authentication
    const user = username === 'testuser' && password === 'password123'

    if (!user) {
      return res(
        ctx.status(400),
        ctx.json({
          detail: 'Incorrect username or password',
        }),
      )
    }

    // Mock successful login with a JWT token
    return res(
      ctx.status(200),
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcmFuayIsImV4cCI6MTcyMzM3Nzg0MH0.3nY_IpQAwEFUTLe14-PpXFQnty8rbaufeIJBr8YEN-A',
        token_type: 'bearer',
      }),
    )
  }),
]

// Mock signup handler
export const signupHandler = [
  rest.post(`${API_BASE_URL}/auth/signup/`, async (req, res, ctx) => {
    const { username, email, password, role } = await req.json()

    // Mock successful signup
    if (username && email && password && role) {
      return res(ctx.status(201), ctx.json({ message: 'User created successfully' }))
    }

    // Mock signup failure
    return res(ctx.status(400), ctx.json({ message: 'Missing required fields' }))
  }),
]

// Mock logout handler
export const logoutHandler = [
  rest.post(`${API_BASE_URL}/auth/logout/`, (req, res, ctx) => {
    // Mock successful logout
    return res(ctx.status(200), ctx.json({ message: 'Logout successful' }))
  }),
]

// Mock get user details handler
export const userDetailsHandler = [
  rest.get(`${API_BASE_URL}/auth/user/`, (req, res, ctx) => {
    // Mock user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'User',
      }),
    )
  }),
]
