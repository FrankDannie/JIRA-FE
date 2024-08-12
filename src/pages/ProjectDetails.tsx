import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, CircularProgress, Grid } from '@mui/material'
import { fetchProjectOverview, fetchTasksForProject } from '../services/dashboardService'
import ProjectOverviewCard from '../components/organisms/dashboard/ProjectOverviewCard'
import TaskBoard from '../components/organisms/task/TaskBoard '
import styles from '../styles/dashboard.module.scss'
import AddButton from '../components/atoms/AddButton'
import { Task } from '../types/taskTypes'

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [projectOverview, setProjectOverview] = useState<any>(null)
  const [stats, setStats] = useState<{ totalTasks: number; completedTasks: number; pendingTasks: number }>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  })
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
        updateStats(tasksData)
      } catch (error) {
        console.error('Error fetching project data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  const updateStats = useCallback((tasksData: Task[]) => {
    const totalTasks = tasksData.length
    const completedTasks = tasksData.filter((task) => task.status === 'completed').length
    const pendingTasks = totalTasks - completedTasks

    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
    })
  }, [])

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
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.projectOverviewCard}>
          <ProjectOverviewCard {...projectOverview} {...stats} />
        </Grid>
      </Grid>
      <div className={styles.addButtonWrapper}>
        <AddButton onClick={handleAddClick} label="Task" />
      </div>
      <TaskBoard updateStats={updateStats} />
    </Box>
  )
}

export default ProjectDetails
