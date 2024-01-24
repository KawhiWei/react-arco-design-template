import './style.less';

import {
    AvatarComponent,
    BreadcrumbComponent,
    LogoComponent,
    MenuComponent,
    NavBarItemComponent
} from './components';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import { Layout } from '@arco-design/web-react';
import { Outlet } from 'react-router-dom';

const { Sider } = Layout;
const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;
const PublicLayout = () => {
    
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };


    return (
        <Layout className="layout-container">
            <Header className="layout-header">
                <LogoComponent />
                <div className="layout-header-right">
                    <NavBarItemComponent />
                    <AvatarComponent />
                </div>
            </Header>
            <Layout className="layout-main-wrap">
                <Sider
                    width="240"
                    collapsed={collapsed}
                    collapsible
                    onCollapse={handleCollapsed}
                    trigger={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
                    breakpoint="xl"
                >
                    <MenuComponent />
                </Sider>
                <Content className="layout-content">
                    <div className="layout-content-breadcrumb">
                        <BreadcrumbComponent />
                        <div className="layout-main-content">
                            <Outlet />
                        </div>
                    </div>
                    <Footer className="layout-footer">© hu-snail-2022 arco-admin-template</Footer>
                </Content>
            </Layout>
        </Layout>
    )
};
export default React.memo(PublicLayout);