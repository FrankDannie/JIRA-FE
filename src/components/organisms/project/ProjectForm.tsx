import React, { useState, useEffect } from 'react'
import InputField from '../../molecules/InputField'
import Button from '../../atoms/Button'
import { createProject, updateProject } from '../../../services/projectService'

interface ProjectFormProps {
  onClose: () => void
  initialData?: {
    name: string
    description: string
    start_date: string
    end_date: string
  }
  isEditMode?: boolean
  projectId?: string
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, initialData, isEditMode = false, projectId }) => {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [startDate, setStartDate] = useState(initialData?.start_date || '')
  const [endDate, setEndDate] = useState(initialData?.end_date || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = { name, description, start_date: startDate, end_date: endDate }

    try {
      if (isEditMode && projectId) {
        await updateProject(projectId, projectData)
      } else {
        await createProject(projectData)
      }
      onClose()
      window.location.reload() // Optional: Refresh page after successful operation
    } catch (error) {
      console.error('Error submitting project form', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Project Name"
        type="text"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Description"
        type="text"
        placeholder="Enter project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputField
        label="Start Date"
        type="date"
        placeholder="Enter start date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <InputField
        label="End Date"
        type="date"
        placeholder="Enter end date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button label={isEditMode ? 'Update Project' : 'Create Project'} onClick={handleSubmit} />
    </form>
  )
}

export default ProjectForm
