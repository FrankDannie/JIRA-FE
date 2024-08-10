import React, { useState, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { fetchTasksForProject, updateTask } from '../../../services/taskService'
import styles from '../../../styles/dashboard.module.scss'

interface Task {
  title: string
  id: string
  description: string
  status: string
}

const TaskBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [toStartTasks, setToStartTasks] = useState<Task[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])

  useEffect(() => {
    if (!projectId) return

    const fetchData = async () => {
      try {
        const tasksData = await fetchTasksForProject(projectId)
        setToStartTasks(tasksData.filter((task: { status: string }) => task.status === 'to_start'))
        setInProgressTasks(tasksData.filter((task: { status: string }) => task.status === 'in_progress'))
        setCompletedTasks(tasksData.filter((task: { status: string }) => task.status === 'completed'))
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }

    fetchData()
  }, [projectId])

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result

    // If the task is dropped outside the list, do nothing
    if (!destination) return

    // Handle moving tasks within the same list or between lists
    const sourceTasks = getTasksArray(source.droppableId)
    const destinationTasks = getTasksArray(destination.droppableId)

    const [movedTask] = sourceTasks.splice(source.index, 1)

    // Check if the task is dropped in the same column but in a different position
    if (source.droppableId === destination.droppableId) {
      // Rearrange the tasks within the same column
      sourceTasks.splice(destination.index, 0, movedTask)
      setTasksArray(source.droppableId, sourceTasks)
    } else {
      // Move the task to a different column
      movedTask.status = destination.droppableId
      destinationTasks.splice(destination.index, 0, movedTask)
      setTasksArray(source.droppableId, sourceTasks)
      setTasksArray(destination.droppableId, destinationTasks)
    }

    try {
      await updateTask(projectId!, movedTask.id, movedTask)
    } catch (error) {
      console.error('Failed to update task status:', error)
      // Revert the changes if there's an error
      if (source.droppableId === destination.droppableId) {
        // Revert within the same column
        sourceTasks.splice(destination.index, 1)
        sourceTasks.splice(source.index, 0, movedTask)
        setTasksArray(source.droppableId, sourceTasks)
      } else {
        // Revert between different columns
        destinationTasks.splice(destination.index, 1)
        sourceTasks.splice(source.index, 0, movedTask)
        setTasksArray(source.droppableId, sourceTasks)
        setTasksArray(destination.droppableId, destinationTasks)
      }
    }
  }

  const getTasksArray = useCallback(
    (droppableId: string): Task[] => {
      switch (droppableId) {
        case 'to_start':
          return [...toStartTasks]
        case 'in_progress':
          return [...inProgressTasks]
        case 'completed':
          return [...completedTasks]
        default:
          return []
      }
    },
    [toStartTasks, inProgressTasks, completedTasks],
  )

  const setTasksArray = useCallback((droppableId: string, tasks: Task[]) => {
    switch (droppableId) {
      case 'to_start':
        setToStartTasks(tasks)
        break
      case 'in_progress':
        setInProgressTasks(tasks)
        break
      case 'completed':
        setCompletedTasks(tasks)
        break
      default:
        break
    }
  }, [])

  const columns = {
    to_start: {
      title: 'To Start',
      tasks: toStartTasks,
    },
    in_progress: {
      title: 'In Progress',
      tasks: inProgressTasks,
    },
    completed: {
      title: 'Completed',
      tasks: completedTasks,
    },
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles.boardContainer}>
        <Box className={styles.columnsContainer}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} className={styles.column}>
                  <Typography variant="h6" className={styles.columnTitle}>
                    {column.title}
                  </Typography>
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.taskCard}
                        >
                          <Typography variant="h5">{task.title}</Typography>
                          <Typography variant="body2">{task.description}</Typography>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </Box>
    </DragDropContext>
  )
}

export default TaskBoard
