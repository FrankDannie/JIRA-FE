const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchTasksForProject = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json()
}

export const getTaskDetails = async (projectId: string, taskId: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch task details')
  }
  return response.json()
}

export const updateTask = async (
  projectId: string,
  taskId: string,
  updatedTask: {
    title?: string
    description?: string
    status?: string
    priority?: string
    deadline?: string
    assigned_to?: string
  },
) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })
  if (!response.ok) {
    throw new Error('Failed to update task')
  }
  return response.json()
}
