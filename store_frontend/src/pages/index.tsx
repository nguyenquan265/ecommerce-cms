import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default RootLayout
