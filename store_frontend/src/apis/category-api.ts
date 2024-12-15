import { Category } from '@/type'
import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID

export const useGetAllCategoriesFromStore = () => {
  const getAllCategoriesRequest = async (): Promise<Category[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/categories/store/${STORE_ID}`)

    if (!res.ok) {
      throw new Error('Failed to get categories from store')
    }

    return res.json()
  }

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoriesRequest
  })

  return { categories, isLoading }
}

export const useGetSingleCategory = (categoryId: string = '') => {
  const getSingleCategoryRequest = async (): Promise<Category> => {
    const res = await fetch(`${SERVER_URL}/api/v1/categories/${categoryId}`)

    if (!res.ok) {
      throw new Error('Failed to get category')
    }

    return res.json()
  }

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', { categoryId }],
    queryFn: getSingleCategoryRequest,
    enabled: categoryId === 'new' ? false : !!categoryId
  })

  return { category, isLoading }
}
