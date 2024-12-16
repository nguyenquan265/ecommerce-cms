import { Size } from '@/type'

import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID

export const useGetAllSizesFromStore = () => {
  const getAllSizesRequest = async (): Promise<Size[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/sizes/store/${STORE_ID}`)

    if (!res.ok) {
      throw new Error('Failed to get sizes from store')
    }

    return res.json()
  }

  const { data: sizes, isLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: getAllSizesRequest
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
