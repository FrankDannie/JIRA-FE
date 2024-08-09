import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import PrivateRoute from '../common/PrivateRoute'
import Dashboard from '../pages/Dashboard'
import ProjectDetails from '../pages/ProjectDetails'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/dashboard/project/:projectId" element={<ProjectDetails />} />
    </Routes>
  )
}

export default AppRoutes
