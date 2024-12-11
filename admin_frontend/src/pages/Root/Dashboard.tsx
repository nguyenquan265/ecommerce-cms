import { useGetUserStore } from '@/apis/store-api'
import { Navigate, useParams } from 'react-router-dom'

const DashboardPage = () => {
  const { storeId } = useParams()
  const { store, isLoading } = useGetUserStore(storeId)

  if (isLoading) {
    return null
  }

  if (!store) {
    return <Navigate to='/' />
  }

  return <div>{store.name}</div>
}

export default DashboardPage
