import { ColorFormValues } from '@/components/forms/ColorForm'
import { Color } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllColorsFromStore = (storeId: string = '') => {
  const getAllColorsRequest = async (): Promise<Color[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/colors/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get colors')
    }

    return res.json()
  }

  const { data: colors, isLoading } = useQuery({
    queryKey: ['colors', { storeId }],
    queryFn: getAllColorsRequest,
    enabled: !!storeId
  })

  return { colors, isLoading }
}

export const useGetSingleColor = (colorId: string = '') => {
  const getSingleColorRequest = async (): Promise<Color> => {
    const res = await fetch(`${SERVER_URL}/api/v1/colors/${colorId}`)

    if (!res.ok) {
      throw new Error('Failed to get color')
    }

    return res.json()
  }

  const { data: color, isLoading } = useQuery({
    queryKey: ['color', { colorId }],
    queryFn: getSingleColorRequest,
    enabled: colorId === 'new' ? false : !!colorId
  })

  return { color, isLoading }
}

export const useCreateColor = (storeId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createColorRequest = async (data: ColorFormValues): Promise<Color> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/colors/store/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to create color')
    }

    return res.json()
  }

  const { mutateAsync: createColor, isPending } = useMutation({
    mutationFn: createColorRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', { storeId }] })
    }
  })

  return { createColor, isPending }
}

export const useUpdateColor = (storeId: string = '', colorId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateColorRequest = async (data: ColorFormValues): Promise<Color> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/colors/store/${storeId}/${colorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error('Failed to update color')
    }

    return res.json()
  }

  const { mutateAsync: updateColor, isPending } = useMutation({
    mutationFn: updateColorRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['colors'] })
      queryClient.setQueryData(['color', { colorId }], data)
    }
  })

  return { updateColor, isPending }
}

export const useDeleteColor = (storeId: string = '', colorId: string = '') => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const deleteColorRequest = async () => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/colors/store/${storeId}/${colorId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to delete color')
    }
  }

  const { mutateAsync: deleteColor, isPending } = useMutation({
    mutationFn: deleteColorRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] })
      queryClient.removeQueries({ queryKey: ['color', { colorId }] })
    }
  })

  return { deleteColor, isPending }
}
