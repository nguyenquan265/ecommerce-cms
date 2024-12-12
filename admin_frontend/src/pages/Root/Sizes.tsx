import { useParams } from 'react-router-dom'
import { SizeColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'
import { useGetAllSizesFromStore } from '@/apis/size-api'
import SizeClient from '@/components/shared/SizeClient'

const SizesPage = () => {
  const { storeId } = useParams()
  const { sizes, isLoading } = useGetAllSizesFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!sizes) {
    return null
  }

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient sizes={formattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage
