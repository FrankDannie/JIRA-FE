import React from 'react'
import Label from '../atoms/Label'
import Input from '../atoms/Input'

type InputFieldProps = {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showError?: boolean
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, showError }) => {
  return (
    <div className="input-field">
      <Label text={label} />
      {showError && <span style={{ color: 'red' }}>*required</span>}
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default InputField
