import { Button, Input, Space, Tooltip } from 'tdesign-react';
import { MoonIcon, SearchIcon, SunnyIcon } from 'tdesign-icons-react';

interface PublicHeaderProps {
  theme: 'light' | 'dark';
  onChangeTheme: () => void;
}

const PublicHeader = ({ theme, onChangeTheme }: PublicHeaderProps) => {
    return (
        <div className="layout-header-edit" >
            <Space size="medium">
        <Input
          style={{
            width: 200
          }}
          prefixIcon={<SearchIcon />}
          placeholder="请输入内容查询"
        />
 <Tooltip
          placement="bottom"
          trigger="hover"
          content={`点击切换为${theme === 'light' ? '暗黑' : '亮色'}模式`}
        >
          <Button
            shape="circle"
            icon={theme === 'light' ? <MoonIcon /> : <SunnyIcon />}
            onClick={onChangeTheme}
          />
        </Tooltip>
                
            </Space>
        </div>

    )
}
export default PublicHeader
