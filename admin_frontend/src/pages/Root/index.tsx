import StoreModal from '@/components/modals/StoreModal'
import Navbar from '@/components/shared/Navbar'
import ClerkProtectedRoute from '@/providers/ClerkProtectedRoute'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <ClerkProtectedRoute>
      <StoreModal />
      <Navbar />
      <Outlet />
    </ClerkProtectedRoute>
  )
}

export default RootLayout
