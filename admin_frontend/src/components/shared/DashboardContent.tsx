import { useGetOverview } from '@/apis/order-api'
import { Overview } from '@/components/shared/Overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign } from 'lucide-react'
import { useParams } from 'react-router-dom'

const DashboardContent = () => {
  const { storeId } = useParams()
  const { overview, isLoading } = useGetOverview(storeId)

  if (isLoading) return null

  if (!overview) return null

  const { totalRevenue, salesCount, graphData } = overview
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='w-4 h-4 text-muted-foreground' />
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>{formatter.format(totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <CreditCard className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+{salesCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card className='col-span-4'>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>

        <CardContent className='pl-2'>
          <Overview data={graphData as any} />
        </CardContent>
      </Card>
    </>
  )
}

export default DashboardContent
