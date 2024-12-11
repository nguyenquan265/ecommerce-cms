import { CreateStoreFormValues } from '@/components/modals/StoreModal'
import { Store } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllUserStores = () => {
  const { getToken } = useAuth()

  const getAllUserStoresRequest = async (): Promise<Store[]> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/stores`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to get user stores')
    }

    return res.json()
  }

  const { data: stores, isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: getAllUserStoresRequest
  })

  return { stores, isLoading }
}

export const useGetUserStore = (storeId: string = '') => {
  const { getToken } = useAuth()

  const getUserStoreRequest = async (): Promise<Store> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/stores/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to get user store')
    }

    return res.json()
  }

  const { data: store, isLoading } = useQuery({
    queryKey: ['store', { storeId }],
    queryFn: getUserStoreRequest,
    enabled: !!storeId
  })

  return { store, isLoading }
}

export const useCreateStore = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createStoreRequest = async (data: CreateStoreFormValues): Promise<Store> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/stores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create store')
    }

    return res.json()
  }

  const { mutateAsync: createStore, isPending } = useMutation({
    mutationFn: createStoreRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
    }
  })

  return { createStore, isPending }
}

export const useUpdateStore = (storeId: string) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateStoreRequest = async ({ name }: { name: string }): Promise<Store> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/stores/${storeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ name })
    })

    if (!res.ok) {
      throw new Error('Failed to update store')
    }

    return res.json()
  }

  const { mutateAsync: updateStore, isPending } = useMutation({
    mutationFn: updateStoreRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
      queryClient.setQueryData(['store', { storeId: data.id }], data)
    }
  })

  return { updateStore, isPending }
}

export const useDeleteStore = (storeId: string) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteStoreRequest = async () => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/stores/${storeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete store')
    }
  }

  const { mutateAsync: deleteStore, isPending } = useMutation({
    mutationFn: deleteStoreRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
      queryClient.removeQueries({ queryKey: ['store', { storeId }] })
    }
  })

  return { deleteStore, isPending }
}
