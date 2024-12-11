import BillboardClient from '@/components/shared/BillboardClient'
import { useGetAllBillboardsFromStore } from '@/apis/billboard-api'
import { useParams } from 'react-router-dom'
import { BillboardColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'

const BillboardsPage = () => {
  const { storeId } = useParams()
  const { billboards, isLoading } = useGetAllBillboardsFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!billboards) {
    return null
  }

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient billboards={formattedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
