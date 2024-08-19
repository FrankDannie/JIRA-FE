import React from 'react'
import { TextField } from '@mui/material'

interface InputFieldProps {
  label: string
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showError?: boolean
  multiline?: boolean
  rows?: number
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  showError,
  multiline = false,
  rows = 1,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={showError}
      fullWidth
      multiline={multiline}
      rows={rows}
      sx={{ marginBottom: 2 }}
      InputLabelProps={{ shrink: true }}
    />
  )
}

export default InputField
