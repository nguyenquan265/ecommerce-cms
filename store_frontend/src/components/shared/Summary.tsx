import useCart from '@/hooks/use-cart'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Currency from './Currentcy'
import Button from './Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCreateOrder } from '@/apis/order-api'

const Summary = () => {
  const [searchParams] = useSearchParams()
  const { createOrder, isPending } = useCreateOrder()
  const navigate = useNavigate()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)
  const totalPrice = items.reduce((total, item) => total + Number(item.price), 0)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.')
    }
  }, [searchParams, removeAll])

  const onCheckout = async () => {
    const productIds = items.map((item) => item.id)

    const url = await createOrder(productIds)

    navigate(url)
  }

  return (
    <div className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
          <div className='text-base font-medium text-gray-400'>Order Total</div>

          <Currency value={totalPrice} />
        </div>
      </div>
      <Button disabled={items.length === 0 || isPending} className='w-full mt-6' onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  )
}

export default Summary
