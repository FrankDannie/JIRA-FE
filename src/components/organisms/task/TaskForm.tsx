import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, MenuItem, Grid, FormHelperText } from '@mui/material'
import styles from '../../../styles/taskForm.module.scss'
import { createTask, getTaskDetails, updateTask, deleteTask } from '../../../services/taskService'
import { Task } from '../../../types/taskTypes'
import Comments from '../comments/Comments'

const TaskForm: React.FC<{ mode: 'create' | 'edit' }> = ({ mode }) => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>()
  const navigate = useNavigate()
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: '',
    priority: '',
    deadline: '',
    assigned_to: '',
  })
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [errors, setErrors] = useState({
    title: '',
    status: '',
    priority: '',
    deadline: '',
  })

  useEffect(() => {
    if (mode === 'edit' && taskId) {
      const fetchTask = async () => {
        if (projectId && taskId) {
          const taskData = await getTaskDetails(projectId, taskId)
          setTask(taskData)
        }
      }
      fetchTask()
    }
  }, [mode, projectId, taskId])

  const validateFields = () => {
    const newErrors = {
      title: task.title ? '' : '*required',
      status: task.status ? '' : '*required',
      priority: task.priority ? '' : '*required',
      deadline: task.deadline ? '' : '*required',
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
    setIsSaveEnabled(true)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const handleSave = async () => {
    if (validateFields() && projectId) {
      if (mode === 'create') {
        await createTask(projectId, task)
      } else if (mode === 'edit' && taskId) {
        await updateTask(projectId, taskId, task)
      }
      navigate(`/project/${projectId}`)
    }
  }

  const handleDelete = async () => {
    if (projectId && taskId) {
      await deleteTask(projectId, taskId)
      navigate(`/project/${projectId}`)
    }
  }

  return (
    <Box className={styles.taskFormContainer} sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            name="title"
            label="Title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
          />
          <TextField
            name="description"
            label="Description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={10}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="status"
            label="Status"
            value={task.status}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            error={!!errors.status}
            helperText={errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
          >
            <MenuItem value="to_start">To Start</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            name="priority"
            label="Priority"
            value={task.priority}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            error={!!errors.priority}
            helperText={errors.priority && <FormHelperText error>{errors.priority}</FormHelperText>}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            name="deadline"
            label="Deadline"
            value={task.deadline}
            onChange={handleChange}
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.deadline}
            helperText={errors.deadline && <FormHelperText error>{errors.deadline}</FormHelperText>}
          />
          <TextField
            name="assigned_to"
            label="Assigned To"
            value={task.assigned_to}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!isSaveEnabled}
            sx={{ marginRight: 2 }}
          >
            {mode === 'create' ? 'Create Task' : 'Save Changes'}
          </Button>
          {mode === 'edit' && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Task
            </Button>
          )}
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 3 }}>
        <Comments />
      </Box>
    </Box>
  )
}

export default TaskForm
