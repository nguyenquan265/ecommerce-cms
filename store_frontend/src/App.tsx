import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from './pages/Error'
import RootLayout from './pages'
import HomePage from './pages/Home'
import ProductPage from './pages/Product'

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
        path: '/products/:productId',
        element: <ProductPage />
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
