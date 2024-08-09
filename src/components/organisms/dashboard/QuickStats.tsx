import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../../../styles/dashboard.module.scss'

interface QuickStatsProps {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
}

const QuickStats: React.FC<QuickStatsProps> = ({ totalTasks, completedTasks, pendingTasks }) => {
  return (
    <Box className={styles.quickStats}>
      <Box className={`${styles.statBox} ${styles.totalTasks}`}>
        <Typography variant="h6">Total Tasks</Typography>
        <Typography variant="h4">{totalTasks}</Typography>
      </Box>
      <Box className={`${styles.statBox} ${styles.completedTasks}`}>
        <Typography variant="h6">Completed Tasks</Typography>
        <Typography variant="h4">{completedTasks}</Typography>
      </Box>
      <Box className={`${styles.statBox} ${styles.pendingTasks}`}>
        <Typography variant="h6">Pending Tasks</Typography>
        <Typography variant="h4">{pendingTasks}</Typography>
      </Box>
    </Box>
  )
}

export default QuickStats
