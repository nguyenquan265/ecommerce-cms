import ProductClient from '@/components/shared/ProductClient'
import { useGetAllProductsFromStore } from '@/apis/product-api'
import { useParams } from 'react-router-dom'
import { ProductColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const ProductsPage = () => {
  const { storeId } = useParams()
  const { products, isLoading } = useGetAllProductsFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!products) {
    return null
  }

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient products={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
