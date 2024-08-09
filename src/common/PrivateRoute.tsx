import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" />
  }

  // If token exists, render the children (protected component)
  return <>{children}</>
}

export default PrivateRoute
