import { UserButton } from '@clerk/clerk-react'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'
import { useGetAllUserStores } from '@/apis/store-api'
import NavbarSkeleton from './NavbarSkeleton'

const Navbar = () => {
  const { stores, isLoading } = useGetAllUserStores()

  if (isLoading) {
    return <NavbarSkeleton />
  }

  if (!stores) {
    return null
  }

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />

        <MainNav className='mx-6' />

        <div className='ml-auto flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar
