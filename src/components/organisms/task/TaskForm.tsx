import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, MenuItem } from '@mui/material'
import styles from '../../../styles/taskForm.module.scss'
import { createTask, getTaskDetails, updateTask } from '../../../services/taskService'
import { Task } from '../../../types/taskTypes'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
    setIsSaveEnabled(true)
  }

  const handleSave = async () => {
    console.log(mode)
    if (projectId) {
      if (mode === 'create') {
        await createTask(projectId, task)
      } else if (mode === 'edit' && taskId) {
        await updateTask(projectId, taskId, task)
      }
      navigate(`/project/${projectId}`)
    }
  }

  return (
    <Box className={styles.taskFormContainer}>
      <TextField name="title" label="Title" value={task.title} onChange={handleChange} fullWidth margin="normal" />
      <TextField
        name="description"
        label="Description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        name="status"
        label="Status"
        value={task.status}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
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
      />
      <TextField
        name="assigned_to"
        label="Assigned To"
        value={task.assigned_to}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} disabled={!isSaveEnabled}>
        {mode === 'create' ? 'Create Task' : 'Save Changes'}
      </Button>
    </Box>
  )
}

export default TaskForm
