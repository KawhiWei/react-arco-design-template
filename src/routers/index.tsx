import { Suspense, lazy } from 'react';

import EmptyLayout from '@/layouts/empty-layout';
import {
  IconDashboard
} from '@arco-design/web-react/icon';
import LayoutPage from '@/layouts';
import LoadingComponent from '@/components/loading';
import RequireAuth from '@/components/auth';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login'));
const load = (children: any) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
const Workplace = lazy(() => import('@/pages/dashboard/workplace'));

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
  {
    path: '/dashboard',
    key: '/dashboard',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.dashboard',
      title: '仪表盘',
      icon: <IconDashboard/>
    },
    children: [
      {
        path: 'workplace',
        key: '/dashboard/workplace',
        element: load(<Workplace />),
        meta: {
          name: 'menu.dashboard.workplace',
          title: '工作台'
        }
      },
    ]
  }
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export const localRouters = routeList;
export default RenderRouter;
