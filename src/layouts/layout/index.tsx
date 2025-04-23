import './index.css';

import { Breadcrumb, Button, Layout } from '@arco-design/web-react';

import GlobalLoading from '../../components/global-loading';
import { Outlet } from 'react-router-dom';
import PublicContent from './content';
import SliderMenu from './side';
import { Suspense } from 'react';
import useUserDetail from '../common/use-user-detail.';

const Sider = Layout.Sider;
const PublicLayout = () => {
  const { loading } = useUserDetail();


  // if (loading) {
  //   return (
  //     <GlobalLoading />
  //   )
  // }

  return (
    <div style={{ height: '100%' }}>
      <Layout style={{ height: '100%' }}>
        <Sider>
          <SliderMenu />
        </Sider>
        <PublicContent/>
      </Layout>

    </div>)
}
export default PublicLayout