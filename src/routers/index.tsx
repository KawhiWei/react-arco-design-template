import {
  IconBug,
  IconCodeSquare,
  IconDashboard,
  IconMenu
} from '@arco-design/web-react/icon';
import React, { Suspense, lazy } from 'react';

import EmptyLayout from '../layouts/empty-layout';
import LayoutPage from '../layouts';
import LoadingComponent from '../components/loading';
import RequireAuth from '../components/auth';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));
const load = (children: any) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;



const requirePublicLayout = () => (
  <RequireAuth>
    <LayoutPage />
  </RequireAuth>
);

const requireEmptyLayout = () => (
  <RequireAuth>
    <EmptyLayout />
  </RequireAuth>
);

const routeList = [
  {
    path: '/',
    element: requireEmptyLayout(),
    children: [
      {
        index: true,
        key: 'login',
        element: load(<Login />),
        meta: {
          title: '登录'
        }
      }
    ]
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export const localRouters = routeList;
export default RenderRouter;
