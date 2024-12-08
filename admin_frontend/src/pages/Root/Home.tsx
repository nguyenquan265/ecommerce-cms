import { useGetUserStore } from '@/apis/store-api'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  const { store, isLoading } = useGetUserStore()
  const { onClose, onOpen } = useStoreModal()

  useEffect(() => {
    if (!store && !isLoading) {
      onOpen()
    }

    if (store) {
      onClose()
    }
  }, [store, isLoading])

  if (isLoading) {
    return null
  }

  if (store) {
    return <Navigate to={`/${store.id}`} />
  }

  return null
}

export default HomePage
