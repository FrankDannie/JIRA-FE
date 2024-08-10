import React, { useState, useEffect } from 'react'
import styles from '../styles/footer.module.scss'

const Footer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  if (isLoggedIn) {
    return null
  }

  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Project Management Tool. All rights reserved.</p>
    </footer>
  )
}

export default Footer
