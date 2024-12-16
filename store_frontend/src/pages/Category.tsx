import { useGetSingleCategory } from '@/apis/category-api'
import { useGetAllColorsFromStore } from '@/apis/color-api'
import { useGetAllProductsFromStore } from '@/apis/product-api'
import { useGetAllSizesFromStore } from '@/apis/size-api'
import ProductCard from '@/components/cards/ProductCard'
import Billboard from '@/components/shared/Billboard'
import Container from '@/components/shared/Container'
import Filter from '@/components/shared/Filter'
import MobileFilters from '@/components/shared/MobileFilters'
import NoResults from '@/components/shared/NoResults'
import { useParams, useSearchParams } from 'react-router-dom'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const { colorId, sizeId } = Object.fromEntries(searchParams)
  const { products, isLoading: isProductsLoading } = useGetAllProductsFromStore({ categoryId, colorId, sizeId })
  const { sizes, isLoading: isSizesLoading } = useGetAllSizesFromStore()
  const { colors, isLoading: isColorsLoading } = useGetAllColorsFromStore()
  const { category, isLoading: isCategoryLoading } = useGetSingleCategory(categoryId)

  if (isProductsLoading || isSizesLoading || isColorsLoading || isCategoryLoading) {
    return null
  }

  if (!category || !sizes || !colors) {
    return <NoResults />
  }

  return (
    <div className='bg-white'>
      <Container>
        <Billboard data={category.billboard} />

        <div className='px-4 pb-24 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters sizes={sizes} colors={colors} />

            <div className='hidden lg:block'>
              <Filter valueKey='sizeId' name='Sizes' data={sizes} />
              <Filter valueKey='colorId' name='Colors' data={colors} />
            </div>

            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products?.length === 0 && <NoResults />}

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                {products?.map((item) => <ProductCard key={item.id} data={item} />)}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
