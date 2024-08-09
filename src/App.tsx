import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './components/templates/MainLayout'
import AppRoutes from './routes/Routes'
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </AuthProvider>
  )
}

export default App
