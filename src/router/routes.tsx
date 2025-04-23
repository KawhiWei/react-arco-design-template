import { Navigate, RouteObject } from "react-router-dom";

import ErrorPage from '../components/error';
import Login from '../pages/login';
import PublicLayout from "../layouts/layout";

export const routes: RouteObject[] = [
  {
    path: '/user/login',
    Component: Login,
  },
  {
    path: '/',
    element: (
      <Navigate to="/dashboard" />
    ),
  },
  {
    path: '*',
    Component: PublicLayout,
    children: [],
    errorElement: <ErrorPage />
  },
]