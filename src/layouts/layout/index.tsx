import './index.css';

import { Breadcrumb, Button, Layout } from '@arco-design/web-react';
import {
  IconCaretLeft,
  IconCaretRight,
  IconRight,
} from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { useLocation, useMatches, useOutlet } from 'react-router-dom';

import GlobalLoading from '../../components/global-loading';
import PublicContent from './content';
import PublicHeader from './header';
import SliderMenu from './side';
import useUserDetail from '../common/use-user-detail.';

const BreadcrumbItem = Breadcrumb.Item;
const Sider = Layout.Sider;
// 定义一个名为 PublicLayout 的 React 函数组件
const PublicLayout = () => {
  const matches = useMatches();
  // 获取路由组件实例
  const children = useOutlet();
  // 获取当前url
  const { pathname } = useLocation();

  // 使用 useUserDetail 钩子获取用户详情的状态，其中包含 loading 属性
  const { loading } = useUserDetail();

  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbList, setBreadcrumbList] = useState<Array<string>>([]);
  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matches[matches.length - 1];
    console.log('lastRoute--------', lastRoute)
    console.log('children--------', children)
    console.log('matches--------', matches)
    console.log('pathname--------', pathname)
    setBreadcrumbList(pathname.split("/"));
    matches.splice
  }, [collapsed, breadcrumbList])

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
    <div style={{ height: '100%' }}>
      <Layout style={{ height: '100%' }}>
        <Sider collapsed={collapsed} style={{ height: '100%' }}>
          <div style={{ height: '64px', lineHeight: '64px', padding: '0 2px', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: 'auto' }}>
              <Button shape='round' className='trigger' onClick={() => handleCollapsed()}>
                {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
              </Button>
            </div>
          </div>
          <div>
            <SliderMenu />
          </div>
        </Sider>
        <Layout style={{ padding: "0 12px " }}>
          <PublicHeader />
          <Breadcrumb separator={<IconRight />}>
            {
              breadcrumbList.map((item: any) => {
                return <BreadcrumbItem>{item}</BreadcrumbItem>
              })
            }
          </Breadcrumb>
          <PublicContent />
        </Layout>
      </Layout>

    </div>)
}
export default PublicLayout
