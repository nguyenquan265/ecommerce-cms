import { cn } from '@/lib/utils'
import { Link, useLocation, useParams } from 'react-router-dom'

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const { storeId } = useParams()
  const location = useLocation()

  const routes = [
    {
      href: `/${storeId}`,
      label: 'Overview',
      active: location.pathname === `/${storeId}`
    },
    {
      href: `/${storeId}/billboards`,
      label: 'Billboards',
      active: location.pathname === `/${storeId}/billboards`
    },
    {
      href: `/${storeId}/categories`,
      label: 'Categories',
      active: location.pathname === `/${storeId}/categories`
    },
    {
      href: `/${storeId}/sizes`,
      label: 'Sizes',
      active: location.pathname === `/${storeId}/sizes`
    },
    {
      href: `/${storeId}/colors`,
      label: 'Colors',
      active: location.pathname === `/${storeId}/colors`
    },
    {
      href: `/${storeId}/products`,
      label: 'Products',
      active: location.pathname === `/${storeId}/products`
    },
    {
      href: `/${storeId}/orders`,
      label: 'Orders',
      active: location.pathname === `/${storeId}/orders`
    },
    {
      href: `/${storeId}/settings`,
      label: 'Settings',
      active: location.pathname === `/${storeId}/settings`
    }
  ]

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route, index) => (
        <Link
          key={index}
          to={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
