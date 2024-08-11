import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import styles from '../styles/auth.module.scss'
import Button from '../components/atoms/Button'
import InputField from '../components/molecules/InputField'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await login(username, password)
      localStorage.setItem('token', response.token)
      navigate('/dashboard')
      window.location.reload()
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Login" onClick={handleLogin} />
        </form>
        <div className={styles.footer}>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
