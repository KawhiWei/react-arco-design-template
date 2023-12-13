import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Button, Layout, Menu } from '@arco-design/web-react';
import {
  IconApps,
  IconBook,
  IconBug,
  IconBulb,
  IconMenuFold,
  IconMenuUnfold,
} from '@arco-design/web-react/icon';

import { useState } from 'react';

const Dashboard = () => <div>
  
  <Button type="secondary">Cancel</Button>
  Dashboard Content</div>;
const Settings = () => <div>Settings Content</div>;
const Profile = () => <div>Profile Content</div>;
const { Header, Footer, Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function App() {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ height: 50 }}>Header</Header>
          <Layout>
            <Sider width={220}>
              <Menu
                style={{ width: 200, borderRadius: 4 }}
                theme='dark'
                collapse={collapse}
                defaultOpenKeys={['0']}
                defaultSelectedKeys={['0_2']}
              >
                <SubMenu
                  key='0'
                  title={
                    <>
                      <IconApps /> Navigation 1
                    </>
                  }
                >
                  <MenuItem key='0_0'>Menu 1</MenuItem>
                  <MenuItem key='0_1'>Menu 2</MenuItem>
                  <MenuItem key='0_2'>Menu 3</MenuItem>
                  <MenuItem key='0_3'>Menu 4</MenuItem>
                </SubMenu>
                <SubMenu
                  key='1'
                  title={
                    <>
                      <IconBug /> Navigation 2
                    </>
                  }
                >
                  <MenuItem key='1_0'>Menu 1</MenuItem>
                  <MenuItem key='1_1'>Menu 2</MenuItem>
                  <MenuItem key='1_2'>Menu 3</MenuItem>
                </SubMenu>
                <SubMenu
                  key='2'
                  title={
                    <>
                      <IconBulb /> Navigation 3
                    </>
                  }
                >
                  <MenuItem key='2_0'>Menu 1</MenuItem>
                  <MenuItem key='2_1'>Menu 2</MenuItem>
                </SubMenu>
  
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ padding: '24px', width: '100vh' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* Add more routes as needed */}
                </Routes>
              </Content>
              <Footer style={{ textAlign: 'center', height: 50 }}>Footer</Footer>
            </Layout>
          </Layout>
          {/* <Footer style={{ textAlign: 'center', height: 50 }}>Footer</Footer> */}
        </Layout>
      </BrowserRouter >
    </>
  )
}

export default App
