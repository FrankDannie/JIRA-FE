import React, { useState } from 'react'

interface AuthFormProps {
  onSubmit: (data: { username: string; password: string; email: string }) => void
  isSignup?: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignup = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      {isSignup && (
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      )}
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default AuthForm
