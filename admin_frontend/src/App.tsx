import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root'
import AuthLayout from './pages/Auth'
import HomePage from './pages/Root/Home'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import Dashboard from './pages/Root/Dashboard'
import Error from './components/shared/Error'

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
        element: <Dashboard />
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
