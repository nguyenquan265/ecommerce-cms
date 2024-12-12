import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { CategoryColumn, categoriesColumns } from './Columns'
import { DataTable } from '../ui/data-table'
import ApiAlert from './ApiAlert'

interface CategoryClientProps {
  categories: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ categories }) => {
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
        <Heading title={`Categories (${categories.length})`} description='Manage categories for your store' />

        <Button onClick={() => navigate(`/${storeId}/categories/new`)}>
          <Plus className='mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={categoriesColumns} data={categories} searchKey='name' />

      <Heading title='API' description='API calls for categories' />

      <Separator />

      <ApiAlert
        title='GET all categories from store'
        variant='public'
        description={`${baseUrl}/categories/store/${storeId}`}
      />
      <ApiAlert title='GET single category' variant='public' description={`${baseUrl}/categories/{categoryId}`} />
      <ApiAlert
        title='POST new category to a store'
        variant='admin'
        description={`${baseUrl}/categories/store/${storeId}`}
      />
      <ApiAlert
        title='PATCH a category'
        variant='admin'
        description={`${baseUrl}/categories/store/${storeId}/{categoryId}`}
      />
      <ApiAlert
        title='DELETE a category'
        variant='admin'
        description={`${baseUrl}/categories/store/${storeId}/{categoryId}`}
      />
    </>
  )
}

export default CategoryClient
