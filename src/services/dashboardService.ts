const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchProjectOverview = async (projectId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/`)
    if (!response.ok) {
      throw new Error('Failed to fetch project overview')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching project overview:', error)
    throw error
  }
}

export const fetchAllProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

// Fetch tasks for a project
export const fetchTasksForProject = async (projectId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/`)
    if (!response.ok) {
      throw new Error('Failed to fetch tasks for project')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching tasks for project:', error)
    throw error
  }
}
