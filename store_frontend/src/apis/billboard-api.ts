import { Billboard } from '@/type'
import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID
const BILLBOARD_ID = import.meta.env.VITE_BILLBOARD_ID

export const useGetAllBillboardsFromStore = () => {
  const getAllBillboardsRequest = async (): Promise<Billboard[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/billboards/store/${STORE_ID}`)

    if (!res.ok) {
      throw new Error('Failed to get user billboards')
    }

    return res.json()
  }

  const { data: billboards, isLoading } = useQuery({
    queryKey: ['billboards'],
    queryFn: getAllBillboardsRequest
  })

  return { billboards, isLoading }
}

export const useGetSingleBillboard = () => {
  const getSingleBillboardRequest = async (): Promise<Billboard> => {
    const res = await fetch(`${SERVER_URL}/api/v1/billboards/${BILLBOARD_ID}`)

    if (!res.ok) {
      throw new Error('Failed to get billboard')
    }

    return res.json()
  }

  const { data: billboard, isLoading } = useQuery({
    queryKey: ['billboard'],
    queryFn: getSingleBillboardRequest
  })

  return { billboard, isLoading }
}
