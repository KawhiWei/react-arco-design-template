import { Layout } from '@arco-design/web-react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Content = Layout.Content;
const PublicContent = () => {
  return (

      <Suspense>

                            <div className="layout-main-content">
                                <Outlet />
                            </div>

      </Suspense>
  )
}
export default PublicContent