import { BillboardFormValues } from '@/components/forms/BillboardForm'
import { Billboard } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllBillboardsFromStore = (storeId: string = '') => {
  const getAllBillboardsRequest = async (): Promise<Billboard[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/billboards/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get user billboards')
    }

    return res.json()
  }

  const { data: billboards, isLoading } = useQuery({
    queryKey: ['billboards', { storeId }],
    queryFn: getAllBillboardsRequest,
    enabled: !!storeId
  })

  return { billboards, isLoading }
}

export const useGetSingleBillboard = (billboardId: string = '') => {
  const getSingleBillboardRequest = async (): Promise<Billboard> => {
    const res = await fetch(`${SERVER_URL}/api/v1/billboards/${billboardId}`)

    if (!res.ok) {
      throw new Error('Failed to get billboard')
    }

    return res.json()
  }

  const { data: billboard, isLoading } = useQuery({
    queryKey: ['billboard', { billboardId }],
    queryFn: getSingleBillboardRequest,
    enabled: billboardId === 'new' ? false : !!billboardId
  })

  return { billboard, isLoading }
}

export const useCreateBillboard = (storeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createBillboardRequest = async (data: BillboardFormValues): Promise<Billboard> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/billboards/store/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create billboard')
    }

    return res.json()
  }

  const { mutateAsync: createBillboard, isPending } = useMutation({
    mutationFn: createBillboardRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards', { storeId }] })
    }
  })

  return { createBillboard, isPending }
}

export const useUpdateBillboard = (storeId: string = '', billboardId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateBillboardRequest = async (data: BillboardFormValues): Promise<Billboard> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/billboards/store/${storeId}/${billboardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to update billboard')
    }

    return res.json()
  }

  const { mutateAsync: updateBillboard, isPending } = useMutation({
    mutationFn: updateBillboardRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] })
      queryClient.setQueryData(['billboard', { billboardId }], data)
    }
  })

  return { updateBillboard, isPending }
}

export const useDeleteBillboard = (storeId: string = '', billboardId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteBillboardRequest = async () => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/billboards/store/${storeId}/${billboardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete billboard')
    }
  }

  const { mutateAsync: deleteBillboard, isPending } = useMutation({
    mutationFn: deleteBillboardRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] })
      queryClient.removeQueries({ queryKey: ['billboard', { billboardId }] })
    }
  })

  return { deleteBillboard, isPending }
}
