import { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth.store'

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    // Khởi tạo trạng thái auth khi ứng dụng khởi động
    initialize()
  }, [initialize])

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  )
}

export default App
