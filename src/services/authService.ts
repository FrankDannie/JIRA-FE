const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}

export const signup = async (username: string, email: string, password: string, role: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
  })
  if (!response.ok) {
    throw new Error('Signup failed')
  }
  return response.json()
}

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Logout failed')
  }
  return response.json()
}
