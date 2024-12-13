import ColorClient from '@/components/shared/ColorClient'
import { useGetAllColorsFromStore } from '@/apis/color-api'
import { useParams } from 'react-router-dom'
import { ColorColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'

const ColorsPage = () => {
  const { storeId } = useParams()
  const { colors, isLoading } = useGetAllColorsFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!colors) {
    return null
  }

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient colors={formattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage
