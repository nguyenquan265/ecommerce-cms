import { ProductFormValues } from '@/components/forms/ProductForm'
import { Product } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllProductsFromStore = (storeId: string = '') => {
  const getAllProductsRequest = async (): Promise<Product[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/products/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get user products')
    }

    return res.json()
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', { storeId }],
    queryFn: getAllProductsRequest,
    enabled: !!storeId
  })

  return { products, isLoading }
}

export const useGetSingleProduct = (productId: string = '') => {
  const getSingleProductRequest = async (): Promise<Product> => {
    const res = await fetch(`${SERVER_URL}/api/v1/products/${productId}`)

    if (!res.ok) {
      throw new Error('Failed to get product')
    }

    return res.json()
  }

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: getSingleProductRequest,
    enabled: productId === 'new' ? false : !!productId
  })

  return { product, isLoading }
}

export const useCreateProduct = (storeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createProductRequest = async (data: ProductFormValues): Promise<Product> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/products/store/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create product')
    }

    return res.json()
  }

  const { mutateAsync: createProduct, isPending } = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', { storeId }] })
    }
  })

  return { createProduct, isPending }
}

export const useUpdateProduct = (storeId: string = '', productId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateProductRequest = async (data: ProductFormValues): Promise<Product> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/products/store/${storeId}/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to update product')
    }

    return res.json()
  }

  const { mutateAsync: updateProduct, isPending } = useMutation({
    mutationFn: updateProductRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.setQueryData(['product', { productId }], data)
    }
  })

  return { updateProduct, isPending }
}

export const useDeleteProduct = (storeId: string = '', productId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteProductRequest = async () => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/products/store/${storeId}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete product')
    }
  }

  const { mutateAsync: deleteProduct, isPending } = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.removeQueries({ queryKey: ['product', { productId }] })
    }
  })

  return { deleteProduct, isPending }
}
