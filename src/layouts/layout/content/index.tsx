import { Layout } from '@arco-design/web-react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Content = Layout.Content;
const PublicContent = () => {
  return (
    <Content style={{ padding: 12 }}>
      <Suspense>
        <Outlet />
      </Suspense>
    </Content>
  )
}
export default PublicContent