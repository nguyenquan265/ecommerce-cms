import { useParams } from 'react-router-dom'
import { CategoryColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'
import { useGetAllCategoriesFromStore } from '@/apis/category-api'
import CategoryClient from '@/components/shared/CategoryClient'

const CategoriesPage = () => {
  const { storeId } = useParams()
  const { categories, isLoading } = useGetAllCategoriesFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!categories) {
    return null
  }

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
