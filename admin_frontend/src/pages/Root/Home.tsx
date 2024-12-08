import { useGetAllUserStores } from '@/apis/store-api'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  const { stores, isLoading } = useGetAllUserStores()
  const { onClose, onOpen } = useStoreModal()

  useEffect(() => {
    if ((!stores || stores.length === 0) && !isLoading) {
      onOpen()
    }

    if (stores && stores?.length > 0) {
      onClose()
    }
  }, [stores, isLoading])

  if (isLoading) {
    return null
  }

  if (stores && stores.length > 0) {
    return <Navigate to={`/${stores[0].id}`} />
  }

  return null
}

export default HomePage
