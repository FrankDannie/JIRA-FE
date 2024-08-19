import React, { useEffect, useState } from 'react'
import { Box, Grid, CircularProgress, Typography, Card, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllProjects } from '../services/dashboardService'
import styles from '../styles/dashboard.module.scss'
import AddButton from '../components/atoms/AddButton'
import Modal from '../components/molecules/Modal'
import ProjectForm from '../components/organisms/project/ProjectForm'
import { FaEllipsisV } from 'react-icons/fa'
import { deleteProject } from '../services/projectService'
import ConfirmationModal from '../components/modals/ConfirmationModal'

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
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

  const openModal = () => {
    setIsModalOpen(true)
    setIsEditing(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    setIsEditing(false)
  }

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true)
  }

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false)
  }

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`)
  }

  const handleMoreOptionsClick = (event: React.MouseEvent<HTMLElement>, project: any) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedProject(project) // Set entire project object
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (action: string) => {
    handleMenuClose()
    if (action === 'open') {
      if (selectedProject) {
        handleProjectClick(selectedProject.id)
      }
    } else if (action === 'edit') {
      if (selectedProject) {
        setIsEditing(true)
        setIsModalOpen(true)
      }
    } else if (action === 'delete') {
      openConfirmationModal()
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedProject && selectedProject.id) {
      try {
        console.log('Deleting project with ID:', selectedProject.id) // Debug log
        await deleteProject(selectedProject.id)
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== selectedProject.id))
      } catch (error) {
        console.error('Error deleting project:', error)
      } finally {
        closeConfirmationModal()
        window.location.reload()
      }
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
          <Modal isOpen={isModalOpen} onClose={closeModal} title={isEditing ? 'Edit Project' : 'Create New Project'}>
            <ProjectForm
              initialData={isEditing ? selectedProject : undefined}
              onClose={closeModal}
              isEditMode={isEditing}
              projectId={selectedProject?.id}
            />
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
                    <IconButton className={styles.options} onClick={(event) => handleMoreOptionsClick(event, project)}>
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

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </Box>
  )
}

export default Dashboard
