import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root'
import AuthLayout from './pages/Auth'
import HomePage from './pages/Root/Home'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import DashboardPage from './pages/Root/Dashboard'
import Error from './components/shared/Error'
import SettingsPage from './pages/Root/Settings'
import BillboardsPage from './pages/Root/Billboards'
import SingleBillboard from './pages/Root/SingleBillboard'
import CategoriesPage from './pages/Root/Categories'
import SingleCategoryPage from './pages/Root/SingleCategory'

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
        path: ':storeId',
        element: <DashboardPage />
      },
      {
        path: ':storeId/settings',
        element: <SettingsPage />
      },
      {
        path: ':storeId/billboards',
        element: <BillboardsPage />
      },
      {
        path: ':storeId/billboards/:billboardId',
        element: <SingleBillboard />
      },
      {
        path: ':storeId/categories',
        element: <CategoriesPage />
      },
      {
        path: ':storeId/categories/:categoryId',
        element: <SingleCategoryPage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />
      }
    ]
  },
  {
    path: '/sign-up',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />
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
