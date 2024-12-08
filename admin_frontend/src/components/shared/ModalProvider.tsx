import { useEffect, useState } from 'react'
import StoreModal from '../modals/StoreModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  if (!isMounted) return null

  return <StoreModal />
}

export default ModalProvider
