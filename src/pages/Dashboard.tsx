import React, { useEffect, useState } from 'react'
import { Box, Grid, CircularProgress, Typography, Card, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllProjects } from '../services/dashboardService'
import styles from '../styles/dashboard.module.scss'
import AddButton from '../components/atoms/AddButton'
import Modal from '../components/molecules/Modal'
import ProjectForm from '../components/organisms/project/ProjectForm'
import { FaEllipsisV } from 'react-icons/fa'

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
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

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`)
  }

  const handleMoreOptionsClick = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedProject(projectId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProject(null)
  }

  const handleMenuItemClick = (action: string) => {
    handleMenuClose()
    if (action === 'open') {
      handleProjectClick(selectedProject!)
    } else if (action === 'edit') {
      // Handle edit action here
    } else if (action === 'delete') {
      // Handle delete action here
    }
  }

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
    <Box className={styles.dashboardContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.headerContainer}>
          <h1>Projects</h1>
          <AddButton onClick={openModal} label="Project" />
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Project">
            <ProjectForm onClose={closeModal} />
          </Modal>
        </Grid>

        <Grid container item xs={12} spacing={3} className={styles.projectCardsContainer}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card className={styles.projectCard} onClick={() => handleProjectClick(project.id)}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography variant="body2">{project.description}</Typography>
                    </Box>
                    <IconButton
                      className={styles.options}
                      onClick={(event) => handleMoreOptionsClick(event, project.id)}
                    >
                      <FaEllipsisV />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleMenuItemClick('open')}>Open</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('delete')}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

export default Dashboard
