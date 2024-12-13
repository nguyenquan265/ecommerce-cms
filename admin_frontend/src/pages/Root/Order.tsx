import OrderClient from '@/components/shared/OrderClient'
import { useGetAllOrdersFromStore } from '@/apis/order-api'
import { useParams } from 'react-router-dom'
import { OrderColumn } from '@/components/shared/Columns'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const OrdersPage = () => {
  const { storeId } = useParams()
  const { orders, isLoading } = useGetAllOrdersFromStore(storeId)

  if (isLoading) {
    return null
  }

  if (!orders) {
    return null
  }

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((acc, item) => acc + Number(item.product.price), 0)),
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient orders={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage
