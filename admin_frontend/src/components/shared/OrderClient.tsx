import Heading from './Heading'
import { Separator } from '../ui/separator'
import { Navigate, useParams } from 'react-router-dom'
import { useGetUserStore } from '@/apis/store-api'
import { OrderColumn, ordersColumns } from './Columns'
import { DataTable } from '../ui/data-table'

interface OrderClientProps {
  orders: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  const { storeId } = useParams()
  const { store, isLoading } = useGetUserStore(storeId)

  if (isLoading) {
    return null
  }

  if (!store) {
    return <Navigate to='/' />
  }

  return (
    <>
      <Heading title={`Orders (${orders.length})`} description='Manage orders for your store' />

      <Separator />

      <DataTable columns={ordersColumns} data={orders} searchKey='products' />
    </>
  )
}

export default OrderClient
