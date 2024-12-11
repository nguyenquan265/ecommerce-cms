import { useGetUserStore } from '@/apis/store-api'
import SettingsForm from '@/components/forms/SettingsForm'
import { Navigate, useParams } from 'react-router-dom'

const SettingsPage = () => {
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
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
