import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { ColorColumn, colorsColumns } from './Columns'
import { DataTable } from '../ui/data-table'
import ApiAlert from './ApiAlert'

interface ColorClientProps {
  colors: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({ colors }) => {
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
        <Heading title={`Colors (${colors.length})`} description='Manage colors for your store' />

        <Button onClick={() => navigate(`/${storeId}/colors/new`)}>
          <Plus className='mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={colorsColumns} data={colors} searchKey='label' />

      <Heading title='API' description='API calls for colors' />

      <Separator />

      <ApiAlert title='GET all colors from store' variant='public' description={`${baseUrl}/colors/store/${storeId}`} />
      <ApiAlert title='GET single color' variant='public' description={`${baseUrl}/colors/{colorId}`} />
      <ApiAlert title='POST new color to a store' variant='admin' description={`${baseUrl}/colors/store/${storeId}`} />
      <ApiAlert title='PATCH a color' variant='admin' description={`${baseUrl}/colors/store/${storeId}/{colorId}`} />
      <ApiAlert title='DELETE a color' variant='admin' description={`${baseUrl}/colors/store/${storeId}/{colorId}`} />
    </>
  )
}

export default ColorClient
