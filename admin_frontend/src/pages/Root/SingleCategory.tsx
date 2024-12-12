import { useGetAllBillboardsFromStore } from '@/apis/billboard-api'
import { useGetSingleCategory } from '@/apis/category-api'
import CategoryForm from '@/components/forms/CategoryForm'
import { useParams } from 'react-router-dom'

const SingleCategoryPage = () => {
  const { storeId, categoryId } = useParams()
  const { category, isLoading: isCategoryLoading } = useGetSingleCategory(categoryId)
  const { billboards, isLoading: isBillboardsLoading } = useGetAllBillboardsFromStore(storeId)

  if (isCategoryLoading || isBillboardsLoading) {
    return null
  }

  if (!billboards || billboards.length === 0) {
    return <div>This store have no billboards, please create billboard first!</div>
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  )
}

export default SingleCategoryPage
