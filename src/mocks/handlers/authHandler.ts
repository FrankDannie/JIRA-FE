import { rest } from 'msw'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
// Mock login handler
export const loginHandler = [
  rest.post(`${API_BASE_URL}/auth/login/`, async (req, res, ctx) => {
    const { username, password } = await req.json()

    // Simulate user validation
    const validUser = username === 'testuser' && password === 'password123'

    if (validUser) {
      // Mock successful login with a JWT token
      return res(
        ctx.status(200),
        ctx.json({
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcmFuayIsImV4cCI6MTcyMzExMzYzNH0.M_v1eOLl5ZXfBq1B6XP1wU6H1QnaI8uXILuUFAx4fdE',
          token_type: 'bearer',
        }),
      )
    }

    // Mock login failure
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Invalid credentials',
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
