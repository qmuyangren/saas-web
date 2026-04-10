export function useAuth() {
  const isAuthenticated = () => !!localStorage.getItem('token')

  const requireAuth = () => {
    if (!isAuthenticated()) {
      window.location.href = '/login'
      return false
    }
    return true
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return {
    isAuthenticated,
    requireAuth,
    logout,
  }
}
