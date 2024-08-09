import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/dashboard" className={styles.logo}>
        JIRA
      </Link>
      <nav>
        <Link to="/login" className={styles.navLink}>
          Login
        </Link>
        <Link to="/signup" className={styles.navLink}>
          Sign Up
        </Link>
      </nav>
    </header>
  )
}

export default Header
