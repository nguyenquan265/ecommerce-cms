import { useMutation } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID

export const useCreateOrder = () => {
  const createOrderRequest = async (productIds: string[]): Promise<string> => {
    const res = await fetch(`${SERVER_URL}/api/v1/orders/store/${STORE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productIds })
    })

    if (!res.ok) {
      throw new Error('Failed to create order')
    }

    return res.json()
  }

  const { mutateAsync: createOrder, isPending } = useMutation({
    mutationFn: createOrderRequest
  })

  return { createOrder, isPending }
}
