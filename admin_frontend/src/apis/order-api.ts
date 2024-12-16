import { Order } from '@/type'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const useGetAllOrdersFromStore = (storeId: string = '') => {
  const { getToken } = useAuth()

  const getAllOrdersRequest = async (): Promise<Order[]> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/orders/store/${storeId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

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

interface GraphData {
  name: string
  total: number
}

type OverviewReponse = {
  totalRevenue: number
  salesCount: number
  graphData: GraphData
}

export const useGetOverview = (storeId: string = '') => {
  const { getToken } = useAuth()

  const getOverviewRequest = async (): Promise<OverviewReponse> => {
    const token = await getToken()

    const res = await fetch(`${SERVER_URL}/api/v1/orders/store/${storeId}/overview`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Failed to get user orders')
    }

    return res.json()
  }

  const { data: overview, isLoading } = useQuery({
    queryKey: ['overview', { storeId }],
    queryFn: getOverviewRequest,
    enabled: !!storeId
  })

  return { overview, isLoading }
}
