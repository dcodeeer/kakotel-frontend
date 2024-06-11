import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Root } from 'templates/Root';
import { Home } from 'pages/Home';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import { Settings } from 'pages/Settings';
import { Chats } from 'pages/Chats';
import { getMe } from 'api/users';
import { Lease } from 'pages/Lease';
import { Estate } from 'pages/Estate';
import { DashboardHome } from 'pages/dashboard/Home';


import axios from 'axios';
import { Dashboard } from 'templates/Dashboard';
import { DashboardCategories } from 'pages/dashboard/Categories';

axios.defaults.baseURL = process.env.REACT_APP_API_URL; 
axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector(state => state.user);

  if (isAuth) {
    return children;
  } else {
    return <Navigate to='/signin' />;
  }
};

const OnlyPublicRoute = ({ children }) => {
  const { isAuth } = useSelector(state => state.user);

  if (!isAuth) {
    return children;
  } else {
    return <Navigate to='/' />
  }
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>this is error page</div>,
    loader: async () => {
      try {
        await getMe();
      } catch {}

      return {};
    },
    
    children: [
      { path: '/', element: <Home />, loader: Home.loader },
      { path: '/estates/:id', element: <Estate />, loader: Estate.loader },

      { path: '/signup', element: <OnlyPublicRoute><SignUp /></OnlyPublicRoute> },
      { path: '/signin', element: <OnlyPublicRoute><SignIn /></OnlyPublicRoute> },
      
      { path: '/settings', element: <PrivateRoute><Settings /></PrivateRoute> },
      { path: '/lease', element: <PrivateRoute><Lease /></PrivateRoute>, loader: Lease.loader},
      { path: '/chats', element: <PrivateRoute><Chats /></PrivateRoute>, loader: Chats.loader },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <div>this is error page</div>,

    children: [
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/dashboard/categories', element: <DashboardCategories />, loader: DashboardCategories.loader },
    ],
  }
]);