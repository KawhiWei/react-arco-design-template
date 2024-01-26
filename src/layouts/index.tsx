import './style.less';

import {
    AvatarComponent,
    BreadcrumbComponent,
    LogoComponent,
    MenuComponent,
    NavBarItemComponent
} from './components';
import React, { Suspense } from 'react';

import { Layout } from '@arco-design/web-react';
import LoadingComponent from '@/components/loading';
import { Outlet } from 'react-router-dom';

const load = (children: any) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
const { Sider } = Layout;
const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;
const PublicLayout = () => {
    return (
        <div>
            {load(<Layout className="layout-container">
                <Header className="layout-header">
                    <LogoComponent />
                    <div className="layout-header-right">
                        <NavBarItemComponent />
                        <AvatarComponent />
                    </div>
                </Header>
                <Layout className="layout-main-wrap">
                    <Sider width="240" breakpoint="xl">
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
            </Layout>)}
        </div>
    )
};
export default React.memo(PublicLayout);