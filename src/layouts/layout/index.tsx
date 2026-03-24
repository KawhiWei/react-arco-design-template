import './style.less';

import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useMatches } from 'react-router-dom';

import AvatarComponent from './avatar';
import { Layout } from 'tdesign-react';
import LogoComponent from './logo';
import PublicContent from './content';
import PublicHeader from './header';
import SliderMenu from './side';
import useUserDetail from '../common/use-user-detail.';

const { Content, Aside, Header } = Layout;

const PublicLayout = () => {
  const matches = useMatches();
  const { pathname } = useLocation();

  useUserDetail();

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const lastRoute = matches[matches.length - 1];
    const handle = lastRoute?.handle as { name?: string } | undefined;
    if (handle?.name) {
      document.title = handle.name;
    }
  }, [matches, pathname])

  const handleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const handleChangeTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme-mode', next);
    if (next === 'dark') {
      document.documentElement.setAttribute('theme-mode', 'dark');
    } else {
      document.documentElement.removeAttribute('theme-mode');
    }
  };

  return (

    <Layout className="layout-container">
      <Header className="layout-header">
        <div className="layout-header-left">
          <LogoComponent />
        </div>
        <div className="layout-header-right">
          <PublicHeader theme={theme} onChangeTheme={handleChangeTheme} />
          <AvatarComponent />
        </div>
      </Header>

      <Layout className="layout-body">
        <Aside
          width={collapsed ? '64px' : '232px'}
          className={`layout-sider${collapsed ? ' is-collapsed' : ''}`}
        >
          <div className="layout-sider-menu">
            <SliderMenu collapse={collapsed} theme={theme} />
          </div>
          <div className="layout-sider-trigger-bottom" onClick={handleCollapsed}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </div>
        </Aside>

        <Layout className="layout-main">
          <Content className="layout-content">
            <PublicContent />
          </Content>
        </Layout>
      </Layout>
    </Layout>)
}
export default PublicLayout
