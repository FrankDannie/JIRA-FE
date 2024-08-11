import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/authService'
import styles from '../styles/auth.module.scss'
import InputField from '../components/molecules/InputField'
import Button from '../components/atoms/Button'

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
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Submit" onClick={handleSignup} />
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
