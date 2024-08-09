import { useAuth } from '../context/AuthContext'

const useAuthStore = () => {
  const { isAuthenticated, login, logout } = useAuth()

  return {
    isAuthenticated,
    login,
    logout,
  }
}

export default useAuthStore
