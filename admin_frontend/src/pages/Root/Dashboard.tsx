import { useGetUserStore } from '@/apis/store-api'
import { Navigate, useParams } from 'react-router-dom'

const Dashboard = () => {
  const { storeId } = useParams()
  const { store, isLoading } = useGetUserStore(storeId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!store) {
    return <Navigate to='/' />
  }

  return <div>{store.name}</div>
}

export default Dashboard
