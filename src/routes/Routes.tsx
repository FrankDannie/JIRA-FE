import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import PrivateRoute from '../common/PrivateRoute'
import Dashboard from '../pages/Dashboard'
import ProjectDetails from '../pages/ProjectDetails'
import TaskDetails from '../pages/TaskDetails'
import TaskForm from '../components/organisms/task/TaskForm'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/projects/:projectId/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/projects/:projectId/tasks/new" element={<TaskForm mode="create" />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default AppRoutes
