import { useGetSingleBillboard } from '@/apis/billboard-api'
import BillboardForm from '@/components/forms/BillboardForm'
import { useParams } from 'react-router-dom'

const SingleBillboardPage = () => {
  const { billboardId } = useParams()
  const { billboard, isLoading } = useGetSingleBillboard(billboardId)

  if (isLoading) {
    return null
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default SingleBillboardPage
