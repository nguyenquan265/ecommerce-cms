import { cn } from '@/lib/utils'
import { Link, useLocation, useParams } from 'react-router-dom'

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const { storeId } = useParams()
  const location = useLocation()

  const routes = [
    {
      href: `/${storeId}`,
      label: 'Overview',
      active: location.pathname === `/${storeId}`
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
