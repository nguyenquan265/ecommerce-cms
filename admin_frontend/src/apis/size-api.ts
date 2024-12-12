import { SizeFormValues } from '@/components/forms/SizeForm'
import { Size } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllSizesFromStore = (storeId: string = '') => {
  const getAllSizesRequest = async (): Promise<Size[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/sizes/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get sizes from store')
    }

    return res.json()
  }

  const { data: sizes, isLoading } = useQuery({
    queryKey: ['sizes', { storeId }],
    queryFn: getAllSizesRequest,
    enabled: !!storeId
  })

  return { sizes, isLoading }
}

export const useGetSingleSize = (sizeId: string = '') => {
  const getSingleSizeRequest = async (): Promise<Size> => {
    const res = await fetch(`${SERVER_URL}/api/v1/sizes/${sizeId}`)

    if (!res.ok) {
      throw new Error('Failed to get size')
    }

    return res.json()
  }

  const { data: size, isLoading } = useQuery({
    queryKey: ['size', { sizeId }],
    queryFn: getSingleSizeRequest,
    enabled: sizeId === 'new' ? false : !!sizeId
  })

  return { size, isLoading }
}

export const useCreateSize = (storeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createSizeRequest = async (data: SizeFormValues): Promise<Size> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/sizes/store/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create size')
    }

    return res.json()
  }

  const { mutateAsync: createSize, isPending } = useMutation({
    mutationFn: createSizeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', { storeId }] })
    }
  })

  return { createSize, isPending }
}

export const useUpdateSize = (storeId: string = '', sizeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateSizeRequest = async (data: SizeFormValues): Promise<Size> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/sizes/store/${storeId}/${sizeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to update size')
    }

    return res.json()
  }

  const { mutateAsync: updateSize, isPending } = useMutation({
    mutationFn: updateSizeRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] })
      queryClient.setQueryData(['size', { sizeId }], data)
    }
  })

  return { updateSize, isPending }
}

export const useDeleteSize = (storeId: string = '', sizeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteSizeRequest = async (): Promise<void> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/sizes/store/${storeId}/${sizeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete size')
    }
  }

  const { mutateAsync: deleteSize, isPending } = useMutation({
    mutationFn: deleteSizeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] })
      queryClient.removeQueries({ queryKey: ['category', { sizeId }] })
    }
  })

  return { deleteSize, isPending }
}
