import { Order } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllOrdersFromStore = (storeId: string = '') => {
  const getAllOrdersRequest = async (): Promise<Order[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/orders/store/${storeId}`)

    if (!res.ok) {
      throw new Error('Failed to get user orders')
    }

    return res.json()
  }

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', { storeId }],
    queryFn: getAllOrdersRequest,
    enabled: !!storeId
  })

  return { orders, isLoading }
}
