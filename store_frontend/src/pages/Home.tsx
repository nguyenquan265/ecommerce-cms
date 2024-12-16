import { useGetSingleBillboard } from '@/apis/billboard-api'
import { useGetAllProductsFromStore } from '@/apis/product-api'
import Billboard from '@/components/shared/Billboard'
import Container from '@/components/shared/Container'
import NoResults from '@/components/shared/NoResults'
import ProductList from '@/components/shared/ProductList'

const HomePage = () => {
  const { billboard, isLoading: isBillbordLoading } = useGetSingleBillboard()
  const { products, isLoading: isProductsLoading } = useGetAllProductsFromStore({})

  if (isBillbordLoading || isProductsLoading) {
    return (
      <Container>
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12' />
            <p className='text-gray-500 dark:text-gray-400'>Loading...</p>
          </div>
        </div>
      </Container>
    )
  }

  if (!billboard || !products) {
    return <NoResults />
  }

  return (
    <Container className='min-h-screen'>
      <div className='pb-10 space-y-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage
