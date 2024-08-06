import EmptyLayout from '@/layouts/empty-layout';
import {
  IconDashboard
} from '@arco-design/web-react/icon';
import LayoutPage from '@/layouts';
import RequireAuth from '@/components/auth';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login'));
const Workplace = lazy(() => import('@/pages/dashboard/workplace'));
const TestPage = lazy(() => import('@/pages/dashboard/test'));

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
        element: <Login />,
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
        element: <Workplace />,
        meta: {
          name: 'menu.dashboard.workplace',
          title: '工作台'
        }
      },
      {
        path: 'testPage',
        key: '/dashboard/test',
        element: <TestPage />,
        meta: {
          name: 'menu.dashboard.test',
          title: '测试页面'
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
