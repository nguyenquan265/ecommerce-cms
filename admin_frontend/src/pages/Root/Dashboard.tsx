import { useGetUserStore } from '@/apis/store-api'
import DashboardContent from '@/components/shared/DashboardContent'
import Heading from '@/components/shared/Heading'
import { Separator } from '@/components/ui/separator'
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
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <Heading title='Dashboard' description='Overview of your store' />

        <Separator />

        <DashboardContent />
      </div>
    </div>
  )
}

export default DashboardPage
