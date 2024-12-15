import { cn } from '@/lib/utils'
import { Category } from '@/type'
import { Link, useLocation } from 'react-router-dom'

interface MainNavProps {
  data: Category[]
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const location = useLocation()

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: location.pathname === `/category/${route.id}`
  }))

  return (
    <nav className='mx-6 flex items-center space-x-4 lg:space-x-6'>
      {routes.map((route) => (
        <Link
          key={route.href}
          to={route.href}
          className={cn('text-sm font-medium hover:text-black', route.active ? 'text-black' : 'text-neutral-500')}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
