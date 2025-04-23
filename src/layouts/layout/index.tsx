import './index.css';

import { Breadcrumb, Button, Layout } from '@arco-design/web-react';

import GlobalLoading from '../../components/global-loading';
import { Outlet } from 'react-router-dom';
import PublicContent from './content';
import SliderMenu from './side';
import { Suspense } from 'react';
import useUserDetail from '../common/use-user-detail.';

const Sider = Layout.Sider;
// 定义一个名为 PublicLayout 的 React 函数组件
const PublicLayout = () => {
  // 使用 useUserDetail 钩子获取用户详情的状态，其中包含 loading 属性
  const { loading } = useUserDetail();


  // 注释掉的代码：如果 loading 为 true，则渲染一个全局加载组件 GlobalLoading
  // if (loading) {
  //   return (
  //     <GlobalLoading />
  //   )
  // }

  // 返回组件的 JSX 结构
  return (
    <div style={{ height: '100%' }}>
      <Layout style={{ height: '100%' }}>
        <Sider className={"arco-layout-test"} style={{ height: '100%' }}>
          <SliderMenu />
        </Sider>
        <PublicContent/>
      </Layout>

    </div>)
}
export default PublicLayout