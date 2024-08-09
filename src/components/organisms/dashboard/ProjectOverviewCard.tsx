import React from 'react'
import { Box, Typography } from '@mui/material'
import '../../../styles/dashboard.module.scss'

interface ProjectOverviewCardProps {
  name: string
  description: string
  start_date: string
  end_date: string
}

const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({ name, description, start_date, end_date }) => {
  return (
    <Box className="projectOverviewCard">
      <Typography variant="h6">{name}</Typography>
      <Typography>{description}</Typography>
      <Typography>Start Date: {start_date}</Typography>
      <Typography>End Date: {end_date}</Typography>
    </Box>
  )
}

export default ProjectOverviewCard
