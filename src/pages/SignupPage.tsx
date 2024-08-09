import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/authService'
import styles from '../styles/auth.module.scss'

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await signup(username, email, password, 'user')
      navigate('/login')
    } catch (error) {
      console.error('Signup failed', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className={styles.footer}>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
