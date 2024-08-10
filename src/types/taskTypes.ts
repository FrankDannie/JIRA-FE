export interface Task {
  title: string
  id: number
  description: string
  status: string
}

export interface TaskBoardProps {
  updateStats: (tasks: Task[]) => void
}
