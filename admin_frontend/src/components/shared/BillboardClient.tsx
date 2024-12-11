import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { BillboardColumn, columns } from './Columns'
import { DataTable } from '../ui/data-table'
import ApiAlert from './ApiAlert'

interface BillboardClientProps {
  billboards: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({ billboards }) => {
  const { storeId } = useParams()
  const { store, isLoading } = useGetUserStore(storeId)
  const baseUrl = import.meta.env.VITE_SERVER_URL + `/api/v1`
  const navigate = useNavigate()

  if (isLoading) {
    return null
  }

  if (!store) {
    return <Navigate to='/' />
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Billboards (${billboards.length})`} description='Manage billboards for your store' />

        <Button onClick={() => navigate(`/${storeId}/billboards/new`)}>
          <Plus className='mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={billboards} searchKey='label' />

      <Heading title='API' description='API calls for billboards' />

      <Separator />

      <ApiAlert
        title='GET all billboards from store'
        variant='public'
        description={`${baseUrl}/billboards/store/${storeId}`}
      />
      <ApiAlert title='GET single billboard' variant='public' description={`${baseUrl}/billboards/{billboardId}`} />
      <ApiAlert
        title='POST new billboard to a store'
        variant='admin'
        description={`${baseUrl}/billboards/store/${storeId}`}
      />
      <ApiAlert
        title='PATCH a billboard'
        variant='admin'
        description={`${baseUrl}/billboards/store/${storeId}/{billboardId}`}
      />
      <ApiAlert
        title='DELETE a billboard'
        variant='admin'
        description={`${baseUrl}/billboards/store/${storeId}/{billboardId}`}
      />
    </>
  )
}

export default BillboardClient
