import React, { useEffect, useState } from 'react'
import { Box, Grid, CircularProgress, Typography, Paper, Card, CardContent, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllProjects } from '../services/dashboardService'
import styles from '../styles/dashboard.module.scss'
import AddButton from '../components/atoms/AddButton'

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await fetchAllProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
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

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`)
  }

  const handleAddClick = () => {
    console.log('Add button clicked!')
  }

  return (
    <Box className={styles.dashboardContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.headerContainer}>
          <h1>Projects</h1>

          <AddButton onClick={handleAddClick} label="Project" />
        </Grid>

        <Grid container item xs={12} spacing={3} className={styles.projectCardsContainer}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card className={styles.projectCard} onClick={() => handleProjectClick(project.id)}>
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
