import React from 'react'

type InputProps = {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
}

export default Input
