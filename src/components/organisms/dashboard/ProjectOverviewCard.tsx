import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import QuickStats from './QuickStats'
import '../../../styles/dashboard.module.scss'

interface ProjectOverviewCardProps {
  name: string
  description: string
  start_date: string
  end_date: string
  created_by: string
  totalTasks: number
  completedTasks: number
  pendingTasks: number
}

const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({
  name,
  description,
  start_date,
  end_date,
  created_by,
  totalTasks,
  completedTasks,
  pendingTasks,
}) => {
  return (
    <Grid container spacing={2} className="projectOverviewCard">
      <Grid item xs={6}>
        <Typography variant="h6">{name}</Typography>
        <Typography>{description}</Typography>
        <Typography>Start Date: {start_date}</Typography>
        <Typography>End Date: {end_date}</Typography>
        <Typography>Created By: {created_by}</Typography>
      </Grid>
      <Grid item xs={6}>
        <QuickStats totalTasks={totalTasks} completedTasks={completedTasks} pendingTasks={pendingTasks} />
      </Grid>
    </Grid>
  )
}

export default ProjectOverviewCard
