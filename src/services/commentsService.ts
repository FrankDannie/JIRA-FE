const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getComments = async (projectId: any, taskId: any) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/comments/`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }

  return response.json()
}

export const createComment = async (projectId: any, taskId: any, content: any) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to create comment')
  }

  return response.json()
}

export const updateComment = async (projectId: any, taskId: any, content: any) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/comments/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to update comment')
  }

  return response.json()
}
