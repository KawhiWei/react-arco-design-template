import { RouteObject } from 'react-router-dom';

import ErrorPage from '../components/error';
import PublicLayout from '../layouts/layout';
import Login from '../pages/login';
import { HomeRedirect, RedirectIfAuthenticated, RequireAuth } from './auth';

export const routes: RouteObject[] = [
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: '/login',
        Component: Login,
      },
    ],
  },
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '*',
        Component: PublicLayout,
        children: [],
        errorElement: <ErrorPage />,
      },
    ],
  },
];
