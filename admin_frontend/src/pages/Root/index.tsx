import ClerkProtectedRoute from '@/components/shared/ClerkProtectedRoute'
import ModalProvider from '@/components/shared/ModalProvider'
import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl='/sign-in'
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
    >
      <ClerkProtectedRoute>
        <ModalProvider />
        <Outlet />
      </ClerkProtectedRoute>
    </ClerkProvider>
  )
}

export default RootLayout
