import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Task } from '../types/taskTypes'
import { getTaskDetails } from '../services/taskService'
import TaskForm from '../components/organisms/task/TaskForm'

const TaskDetails: React.FC = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      if (projectId && taskId) {
        const taskData = await getTaskDetails(projectId, taskId)
        setTask(taskData)
      }
    }

    fetchTask()
  }, [projectId, taskId])

  if (!task) return <div>Loading...</div>

  return <TaskForm mode="edit" />
}

export default TaskDetails
