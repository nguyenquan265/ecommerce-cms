import { CategoryFormValues } from '@/components/forms/CategoryForm'
import { Category } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllCategoriesFromStore = (storeId: string = '') => {
  const getAllCategoriesRequest = async (): Promise<Category[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/categories/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get categories from store')
    }

    return res.json()
  }

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', { storeId }],
    queryFn: getAllCategoriesRequest,
    enabled: !!storeId
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

export const useCreateCategory = (storeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createCategoryRequest = async (data: CategoryFormValues): Promise<Category> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/categories/store/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create category')
    }

    return res.json()
  }

  const { mutateAsync: createCategory, isPending } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', { storeId }] })
    }
  })

  return { createCategory, isPending }
}

export const useUpdateCategory = (storeId: string = '', categoryId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateCategoryRequest = async (data: CategoryFormValues): Promise<Category> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/categories/store/${storeId}/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to update category')
    }

    return res.json()
  }

  const { mutateAsync: updateCategory, isPending } = useMutation({
    mutationFn: updateCategoryRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.setQueryData(['category', { categoryId }], data)
    }
  })

  return { updateCategory, isPending }
}

export const useDeleteCategory = (storeId: string = '', categoryId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteCategoryRequest = async (): Promise<void> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/categories/store/${storeId}/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete category')
    }
  }

  const { mutateAsync: deleteCategory, isPending } = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.removeQueries({ queryKey: ['category', { categoryId }] })
    }
  })

  return { deleteCategory, isPending }
}
