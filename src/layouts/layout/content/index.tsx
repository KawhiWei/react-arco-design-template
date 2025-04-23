import { Layout } from '@arco-design/web-react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Header = Layout.Header;
const Content = Layout.Content;
const PublicContent = () => {
  return (
    <Layout>
      <Header style={{ height: "64px", border: '1px solid red' }}></Header>
      <Content style={{ padding: 12 }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  )
}
export default PublicContent