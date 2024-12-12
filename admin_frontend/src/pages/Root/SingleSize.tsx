import { useGetSingleSize } from '@/apis/size-api'
import SizeForm from '@/components/forms/SizeForm'
import { useParams } from 'react-router-dom'

const SingleSizePage = () => {
  const { sizeId } = useParams()
  const { size, isLoading } = useGetSingleSize(sizeId)

  if (isLoading) {
    return null
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SingleSizePage
