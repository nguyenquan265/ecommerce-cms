import { Color } from '@/type'
import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID

export const useGetAllColorsFromStore = () => {
  const getAllColorsRequest = async (): Promise<Color[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/colors/store/${STORE_ID}`)

    if (!res.ok) {
      throw new Error('Failed to get colors')
    }

    return res.json()
  }

  const { data: colors, isLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: getAllColorsRequest
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
