import { Avatar, Button, Dropdown, Layout, Menu } from '@arco-design/web-react';
const Header = Layout.Header;
const PublicHeader = () => {
    const dropList = (
        <Menu>
            <Menu.Item key='1'>Beijing</Menu.Item>
            <Menu.Item key='2'>Shanghai</Menu.Item>
            <Menu.Item key='3'>Guangzhou</Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ height: "64px" }}>
            <div style={{ height: '64px', lineHeight: '64px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: 'auto' }}>
                    <Dropdown droplist={dropList} position='bottom'>
                        <Button type='text'>
                            <Avatar>
                                <img alt='avatar'
                                    src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp' />
                            </Avatar>
                            <span style={{ paddingLeft: '16px', }}>
                                Hi，KawhiWei
                            </span>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Header>

    )
}
export default PublicHeader