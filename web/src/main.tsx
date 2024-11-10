import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import Signin from './components/Signin/index.tsx';
import Signup from './components/Signup';
import { store } from "../../Redux/Store";
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import UserHome from './components/UserHome/'
import Unauthorized from './components/Unauthorized/index.tsx';
import Product from './components/Product'
import Category from './components/Category'
import Banner from './components/Banner'
import User from './components/User'
import Analytics from "./components/Analytics"
import Order from './components/Order'
import Settings from './components/Settings'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Analytics />
          },
          {
            path: 'banner',
            element: <Banner />
          },
          {
            path: 'product',
            element: <Product />
          },
          {
            path: 'order',
            element: <Order />
          },
          {
            path: 'category',
            element: <Category />
          },
          {
            path: 'settings',
            element: <Settings />
          },
          {
            path: 'user',
            element: <User />
          },
        ]
      },
    ],
  },
  {
    element: <ProtectedRoute role="user" />,
    children: [
      {
        path: '/home',
        element: <UserHome />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
