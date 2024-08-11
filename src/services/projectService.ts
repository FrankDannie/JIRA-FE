const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const createProject = async (projectData: {
  name: string
  description: string
  start_date: string
  end_date: string
}) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/projects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    throw new Error('Failed to create project')
  }

  return response.json()
}

export const updateProject = async (
  projectId: string,
  projectData: {
    name: string
    description: string
    start_date: string
    end_date: string
  },
) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    throw new Error('Failed to update project')
  }

  return response.json()
}
