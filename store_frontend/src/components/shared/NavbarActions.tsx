import { ShoppingBag } from 'lucide-react'
import Button from './Button'
import useCart from '@/hooks/use-cart'
import { useNavigate } from 'react-router-dom'

const NavbarActions = () => {
  const cart = useCart()
  const navigate = useNavigate()

  return (
    <div className='ml-auto flex items-center gap-x-4'>
      <Button className='flex items-center rounded-full bg-black px-4 py-2' onClick={() => navigate('/cart')}>
        <ShoppingBag size={20} color='white' />

        <span className='ml-2 text-sm font-medium text-white'>{cart.items.length}</span>
      </Button>
    </div>
  )
}

export default NavbarActions
