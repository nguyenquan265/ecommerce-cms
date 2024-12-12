import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { SizeColumn, sizesColumns } from './Columns'
import { DataTable } from '../ui/data-table'
import ApiAlert from './ApiAlert'

interface SizeClientProps {
  sizes: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({ sizes }) => {
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
        <Heading title={`Sizes (${sizes.length})`} description='Manage sizes for your store' />

        <Button onClick={() => navigate(`/${storeId}/sizes/new`)}>
          <Plus className='mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={sizesColumns} data={sizes} searchKey='name' />

      <Heading title='API' description='API calls for sizes' />

      <Separator />

      <ApiAlert title='GET all sizes from store' variant='public' description={`${baseUrl}/sizes/store/${storeId}`} />
      <ApiAlert title='GET single size' variant='public' description={`${baseUrl}/sizes/{sizeId}`} />
      <ApiAlert title='POST new size to a store' variant='admin' description={`${baseUrl}/sizes/store/${storeId}`} />
      <ApiAlert title='PATCH a size' variant='admin' description={`${baseUrl}/sizes/store/${storeId}/{sizeId}`} />
      <ApiAlert title='DELETE a size' variant='admin' description={`${baseUrl}/sizes/store/${storeId}/{sizeId}`} />
    </>
  )
}

export default SizeClient
