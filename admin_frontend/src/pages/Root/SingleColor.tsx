import { useGetSingleColor } from '@/apis/color-api'
import ColorForm from '@/components/forms/ColorForm'
import { useParams } from 'react-router-dom'

const SingleColorPage = () => {
  const { colorId } = useParams()
  const { color, isLoading } = useGetSingleColor(colorId)

  if (isLoading) {
    return null
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default SingleColorPage
