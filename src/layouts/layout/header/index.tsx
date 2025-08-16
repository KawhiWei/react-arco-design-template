import {
    Button,
    Divider,
    Drawer,
    Dropdown,
    Form,
    Input,
    Menu,
    Message,
    Slider,
    Space,
    Switch,
    Tooltip,
    Typography
} from '@arco-design/web-react';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  IconFullscreen,
  IconFullscreenExit,
  IconMoonFill,
  IconNotification,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconSun
} from '@arco-design/web-react/icon';

const PublicHeader = () => {
 const [theme, setTheme] = useState('light');


  const handleChangeTheme = () => {
    const themeType = theme === 'light' ? 'dark' : 'light';
    setTheme(themeType);
    if (themeType === 'dark') document.body.setAttribute('arco-theme', 'dark');
    else document.body.removeAttribute('arco-theme');
  };

    return (
        <div className="layout-header-edit" >
            <Space size="medium">
        <Input
          style={{
            width: 200
          }}
          prefix={<IconSearch />}
          placeholder="请输入内容查询"
        />
 <Tooltip
          position="bottom"
          trigger="hover"
          content={`点击切换为${theme === 'light' ? '暗黑' : '亮色'}模式`}
        >
          <Button
            shape="circle"
            icon={theme === 'light' ? <IconMoonFill /> : <IconSun />}
            onClick={handleChangeTheme}
          />
        </Tooltip>
                
            </Space>
        </div>

    )
}
export default PublicHeader