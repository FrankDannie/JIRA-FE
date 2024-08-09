import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from '../styles/header.module.scss'
import { login } from '../services/authService'

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'))
  const navigate = useNavigate()

  // Function to handle logout and navigation
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1) // Go back one step in the browser history
  }

  // Function to handle login (for testing purposes)
  const handleLogin = async (username: string, password: string) => {
    // Login logic
    try {
      const response = await login(username, password)
      localStorage.setItem('token', response.token)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <button onClick={handleGoBack} className={styles.backButton}>
            <FaArrowLeft /> {/* Use the back arrow icon */}
          </button>
        ) : null}
        <Link to="/dashboard" className={styles.logo}>
          JIRA
        </Link>
        <div className={styles.navLinks}>
          {!isLoggedIn && (
            <>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
