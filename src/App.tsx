import { ConfigProvider } from '@arco-design/web-react'
import RootRouterProvider from '../src/router/provider'

const App = () => {

  const customTheme = {
    token: {
      primaryColor: '#EB82F1', // 自定义主色
      colorBgBase: '#F5F5F5', // 自定义背景色

    },
    menu: {
      theme: 'dark', // 自定义菜单主题色
    }
  };


  return (
    <>
      <ConfigProvider theme={customTheme}>
        <RootRouterProvider></RootRouterProvider>
      </ConfigProvider>
    </>
  )
}

export default App
