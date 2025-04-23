import { Button, Layout, Menu, Message } from '@arco-design/web-react';
import {
    IconApps,
    IconBook,
    IconBug,
    IconBulb,
    IconMenuFold,
    IconMenuUnfold,
} from '@arco-design/web-react/icon';

import MenuComponent from './menu';
import { useState } from 'react';

const SliderMenu = () => {
    const [collapse, setCollapse] = useState(false);
    return (
        <div>
            <div style={{ height: '64px', lineHeight: '64px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        style={{
                            padding: '0 12px',
                            marginBottom: 4,
                        }}
                        type='primary'
                        onClick={() => setCollapse(!collapse)}
                    >
                        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
                    </Button>
                </div>

            </div>
            <div style={{ height: 'calc(100% - 64px)' }}>
                {/* <Menu
                    collapse={collapse}
                    defaultOpenKeys={['1']}
                    defaultSelectedKeys={['0_3']}
                    onClickMenuItem={(key) =>
                        Message.info({
                            content: `You select ${key}`,
                            showIcon: true,
                        })
                    } style={{ height: 'calc(100% - 64px)' }}>
                    <MenuItem key='0_1'>
                        Menu 1
                    </MenuItem>
                    <MenuItem key='0_2'>
                        Menu 2
                    </MenuItem>
                    <MenuItem key='0_3'>
                        Menu 3
                    </MenuItem>
                    <SubMenu
                        key='1'
                        title={
                            <span>
                                Navigation 1
                            </span>
                        }>
                        <MenuItem key='1_1'>Menu 1</MenuItem>
                        <MenuItem key='1_2'>Menu 2</MenuItem>

                    </SubMenu>
                    <SubMenu
                        key='4'
                        title={
                            <span>
                                Navigation 4
                            </span>
                        }>
                        <MenuItem key='4_1'>Menu 1</MenuItem>
                        <MenuItem key='4_2'>Menu 2</MenuItem>
                        <MenuItem key='4_3'>Menu 3</MenuItem>
                    </SubMenu>
                </Menu> */}
            </div>
            <div style={{ height: 'calc(100% - 64px)' }}>
                <MenuComponent />
            </div>
        </div>
    )
}
export default SliderMenu