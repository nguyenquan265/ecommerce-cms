import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from './pages/Error'
import RootLayout from './pages'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import CategoryPage from './pages/Category'
import CartPage from './pages/Cart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/products',
        element: <Navigate to='/' replace />
      },
      {
        path: '/products/:productId',
        element: <ProductPage />
      },
      {
        path: '/category',
        element: <Navigate to='/' replace />
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      }
    ]
  },
  {
    path: '*',
    element: <Error error={404} />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
