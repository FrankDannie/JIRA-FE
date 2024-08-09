import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/landing.module.scss'

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to Project Management JIRA Tool</h1>
        <p>Your all-in-one solution for managing projects and tasks.</p>
        <div className={styles.buttons}>
          <Link to="/login" className={styles.button}>
            Login
          </Link>
          <Link to="/signup" className={styles.button}>
            Sign Up
          </Link>
        </div>
      </header>
    </div>
  )
}

export default LandingPage
