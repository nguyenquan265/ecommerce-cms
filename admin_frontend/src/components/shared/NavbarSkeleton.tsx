import { Skeleton } from '../ui/skeleton'

const NavbarSkeleton = () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <Skeleton className='h-8 w-[200px]' />
        <div className='mx-6 flex space-x-4'>
          {' '}
          <Skeleton className='h-4 w-[50px]' />
          <Skeleton className='h-4 w-[50px]' />
          <Skeleton className='h-4 w-[50px]' />
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default NavbarSkeleton
