import { useGetAllCategoriesFromStore } from '@/apis/category-api'
import { useGetAllColorsFromStore } from '@/apis/color-api'
import { useGetSingleProduct } from '@/apis/product-api'
import { useGetAllSizesFromStore } from '@/apis/size-api'
import ProductForm from '@/components/forms/ProductForm'
import { useParams } from 'react-router-dom'

const SingleProductPage = () => {
  const { storeId, productId } = useParams()
  const { product, isLoading: isProductLoading } = useGetSingleProduct(productId)
  const { categories, isLoading: isCategoryLoading } = useGetAllCategoriesFromStore(storeId)
  const { sizes, isLoading: isSizeLoading } = useGetAllSizesFromStore(storeId)
  const { colors, isLoading: isColorLoading } = useGetAllColorsFromStore(storeId)

  if (isProductLoading || isCategoryLoading || isSizeLoading || isColorLoading) {
    return null
  }

  if (!categories || categories.length === 0) {
    return <div>This store have no categories, please create category first!</div>
  }

  if (!sizes || sizes.length === 0) {
    return <div>This store have no sizes, please create size first!</div>
  }

  if (!colors || colors.length === 0) {
    return <div>This store have no colors, please create color first!</div>
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm initialData={product} categories={categories} sizes={sizes} colors={colors} />
      </div>
    </div>
  )
}

export default SingleProductPage
