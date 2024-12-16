import PreviewModal from '@/components/modals/PreviewModal'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <PreviewModal />
      <Outlet />

      <Footer />
    </>
  )
}

export default RootLayout
