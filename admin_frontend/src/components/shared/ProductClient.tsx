import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { ProductColumn, productsColumns } from './Columns'
import { DataTable } from '../ui/data-table'
import ApiAlert from './ApiAlert'

interface ProductClientProps {
  products: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({ products }) => {
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
        <Heading title={`Products (${products.length})`} description='Manage products for your store' />

        <Button onClick={() => navigate(`/${storeId}/products/new`)}>
          <Plus className='mr-2 w-4 h-4' />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={productsColumns} data={products} searchKey='name' />

      <Heading title='API' description='API calls for products' />

      <Separator />

      <ApiAlert
        title='GET all products from store'
        variant='public'
        description={`${baseUrl}/products/store/${storeId}`}
      />
      <ApiAlert title='GET single product' variant='public' description={`${baseUrl}/products/{productId}`} />
      <ApiAlert
        title='POST new product to a store'
        variant='admin'
        description={`${baseUrl}/products/store/${storeId}`}
      />
      <ApiAlert
        title='PATCH a product'
        variant='admin'
        description={`${baseUrl}/products/store/${storeId}/{productId}`}
      />
      <ApiAlert
        title='DELETE a product'
        variant='admin'
        description={`${baseUrl}/products/store/${storeId}/{productId}`}
      />
    </>
  )
}

export default ProductClient
