import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />
  }

  // If token exists, render the nested routes
  return <Outlet />
}

export default PrivateRoute
