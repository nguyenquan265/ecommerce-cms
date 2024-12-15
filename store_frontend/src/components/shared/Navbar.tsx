import { Link } from 'react-router-dom'
import Container from './Container'
import MainNav from './MainNav'
import { useGetAllCategoriesFromStore } from '@/apis/category-api'
import NavbarActions from './NavbarActions'

const Navbar = () => {
  const { categories, isLoading } = useGetAllCategoriesFromStore()

  if (isLoading) {
    return null
  }

  if (!categories) {
    return null
  }

  return (
    <div className='borber-b'>
      <Container>
        <div className='relative px-4  sm:px-6 lg:px-8 flex h-16 items-center'>
          <Link to='/' className='ml-4 flex lg:ml-0 gap-x-2'>
            <p>Store</p>
          </Link>

          <MainNav data={categories} />

          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
