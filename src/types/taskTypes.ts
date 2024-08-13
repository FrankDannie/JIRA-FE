export interface Task {
  title: string
  id: number
  description: string
  status: string
  priority: string
  deadline: string
  assigned_to: string
}

export interface TaskBoardProps {
  updateStats: (tasks: Task[]) => void
}
