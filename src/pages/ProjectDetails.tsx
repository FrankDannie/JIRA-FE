import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, CircularProgress, Grid } from '@mui/material'
import { fetchProjectOverview, fetchTasksForProject } from '../services/dashboardService'
import ProjectOverviewCard from '../components/organisms/dashboard/ProjectOverviewCard'
import TaskBoard from '../components/organisms/task/TaskBoard '
import styles from '../styles/dashboard.module.scss'
import AddButton from '../components/atoms/AddButton'

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [projectOverview, setProjectOverview] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const handleAddClick = () => {
    console.log('Add button clicked!')
  }

  useEffect(() => {
    if (!projectId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const projectData = await fetchProjectOverview(projectId)
        setProjectOverview(projectData)

        const tasksData = await fetchTasksForProject(projectId)
        const totalTasks = tasksData.length
        const completedTasks = tasksData.filter((task: { status: string }) => task.status === 'completed').length
        const pendingTasks = totalTasks - completedTasks

        setStats({
          totalTasks,
          completedTasks,
          pendingTasks,
        })
      } catch (error) {
        console.error('Error fetching project data:', error)
        setError('Failed to load project data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className={styles.errorContainer}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <Box className={styles.projectDetailsContainer}>
      {projectOverview && stats && (
        <Grid container spacing={3}>
          <Grid item xs={12} className={styles.projectOverviewCard}>
            <ProjectOverviewCard {...projectOverview} {...stats} />
          </Grid>
        </Grid>
      )}
      <div className={styles.addButtonWrapper}>
        <AddButton onClick={handleAddClick} label="Task" />
      </div>
      <TaskBoard />
    </Box>
  )
}

export default ProjectDetails
