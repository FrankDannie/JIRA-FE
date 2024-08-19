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

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, initialData, isEditMode, projectId }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    start_date: initialData?.start_date?.split('T')[0] || '',
    end_date: initialData?.end_date?.split('T')[0] || '',
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        start_date: initialData.start_date.split('T')[0],
        end_date: initialData.end_date.split('T')[0],
      })
    }
  }, [initialData])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
    setErrors({ ...errors, [field]: false })
  }

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(formData)) {
      if (!value) newErrors[key] = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (isEditMode && projectId) {
        await updateProject(projectId, formData)
      } else {
        await createProject(formData)
      }
      onClose()
      window.location.reload()
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
        value={formData.name}
        onChange={handleChange('name')}
        showError={errors.name}
      />
      <InputField
        label="Description"
        type="text"
        placeholder="Enter project description"
        value={formData.description}
        onChange={handleChange('description')}
        showError={errors.description}
      />
      <InputField
        label="Start Date"
        type="date"
        placeholder="Enter start date"
        value={formData.start_date}
        onChange={handleChange('start_date')}
        showError={errors.start_date}
      />
      <InputField
        label="End Date"
        type="date"
        placeholder="Enter end date"
        value={formData.end_date}
        onChange={handleChange('end_date')}
        showError={errors.end_date}
      />
      <Button label={isEditMode ? 'Update Project' : 'Create Project'} onClick={handleSubmit} />
    </form>
  )
}

export default ProjectForm
