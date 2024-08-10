import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa'
import styles from '../styles/header.module.scss'

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'))
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Function to handle logout and navigation
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
  }

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1)
  }

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <button onClick={handleGoBack} className={styles.backButton}>
            <FaArrowLeft />
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
          {isLoggedIn && (
            <div className={styles.profileMenu}>
              <FaUserCircle className={styles.profileIcon} onClick={toggleDropdown} />
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
