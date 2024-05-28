import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import axios from 'axios';
import { store } from 'store';
import { signInAction } from 'store/actions/user';

import { Root } from 'components/Root';
import { Home } from 'pages/Home';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import { useSelector } from 'react-redux';
import { Settings } from 'pages/Settings';
import { Chats } from 'pages/Chats';
import { getMe } from 'api/users';
import { Lease } from 'pages/Lease';
import { Estate } from 'pages/Estate';

axios.defaults.baseURL = process.env.REACT_APP_API_URL; 
axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector(state => state.user);

  if (isAuth) {
    return children;
  } else {
    return <Navigate to='/signin' />
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

const router = createBrowserRouter([
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
  }
]);


export const App = () => {
  return <RouterProvider router={router} />
};
