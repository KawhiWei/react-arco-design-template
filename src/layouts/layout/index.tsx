import './style.less';

import { Layout } from '@arco-design/web-react';
import {
  IconCaretLeft,
  IconCaretRight,
} from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useOutlet } from 'react-router-dom';

import AvatarComponent from './avatar';
import LogoComponent from './logo';
import PublicContent from './content';
import PublicHeader from './header';
import SliderMenu from './side';
import useUserDetail from '../common/use-user-detail.';

const { Content, Sider, Header } = Layout;

// 定义一个名为 PublicLayout 的 React 函数组件
const PublicLayout = () => {
  const matches = useMatches();
  // 获取路由组件实例
  const children = useOutlet();
  // 获取当前url
  const { pathname } = useLocation();

  // 使用 useUserDetail 钩子获取用户详情的状态，其中包含 loading 属性
  useUserDetail();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matches[matches.length - 1];
    console.log('lastRoute--------', lastRoute)
    console.log('children--------', children)
    console.log('matches--------', matches)
    console.log('pathname--------', pathname)
    //setBreadcrumbList(pathname.split("/"));
    matches.splice
  }, [collapsed])

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 注释掉的代码：如果 loading 为 true，则渲染一个全局加载组件 GlobalLoading
  // if (loading) {
  //   return (
  //     <GlobalLoading />
  //   )
  // }

  // 返回组件的 JSX 结构
  return (
    <div>
      <Layout className="layout-container">
        <Header className="layout-header">
          <LogoComponent />
          <div className="layout-header-right">
            <PublicHeader />
            <AvatarComponent />
          </div>
        </Header>
        <Layout className="layout-main-wrap">
          <Sider collapsed={collapsed}
          onCollapse={handleCollapsed}
          collapsible    
          trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          breakpoint='xl'
          >
            <SliderMenu />
          </Sider>
          <Content className="layout-content" >
            <PublicContent />
          </Content>
        </Layout>
      </Layout>

    </div>)
}
export default PublicLayout
