import { Product } from '@/type'
import { Expand, ShoppingCart } from 'lucide-react'
import Currency from '../shared/Currentcy'
import { MouseEventHandler } from 'react'
import IconButton from '../shared/IconButton'
import { useNavigate } from 'react-router-dom'
import { usePreviewModal } from '@/hooks/use-store-modal'
import useCart from '@/hooks/use-cart'

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart()
  const previewModal = usePreviewModal()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${data.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    cart.addItem(data)
  }

  return (
    <div onClick={handleClick} className='p-3 space-y-4 bg-white border cursor-pointer group rounded-xl'>
      {/* Images and Actions */}
      <div className='relative bg-gray-100 aspect-square rounded-xl'>
        <img src={data?.images?.[0]?.url} alt='Images' className='object-cover rounded-md aspect-square' />
        <div className='absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5'>
          <div className='flex justify-center gap-x-6'>
            <IconButton onClick={onPreview} icon={<Expand size={20} className='text-gray-600' />} />
            <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className='text-gray-600' />} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className='text-lg font-semibold'>{data?.name}</p>
        <p className='text-sm text-gray-500'>{data.category.name}</p>
      </div>

      {/* Price */}
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard
