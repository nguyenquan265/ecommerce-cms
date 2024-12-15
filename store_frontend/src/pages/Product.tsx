import { useGetAllProductsFromStore, useGetSingleProduct } from '@/apis/product-api'
import Container from '@/components/shared/Container'
import Info from '@/components/shared/Info'
import NoResults from '@/components/shared/NoResults'
import ProductList from '@/components/shared/ProductList'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const { productId } = useParams()
  const { product, isLoading: isProductLoading } = useGetSingleProduct(productId)
  const { products: suggestProducts, isLoading: isProductsLoading } = useGetAllProductsFromStore({
    categoryId: product?.category.id
  })

  if (isProductLoading || isProductsLoading) {
    return null
  }

  if (!product) {
    return <NoResults />
  }

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            {/* <Gallery images={product.images} /> */}

            <div className='px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info data={product} />
            </div>
          </div>

          <hr className='my-10' />

          <ProductList title='Related Items' items={suggestProducts || []} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
