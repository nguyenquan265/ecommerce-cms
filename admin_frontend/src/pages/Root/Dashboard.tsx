import { useGetUserStore } from '@/apis/store-api'
import Heading from '@/components/shared/Heading'
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

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading title={store.name} description='Manage your store by following some rules below:' />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
