import { ConfigProvider } from '@arco-design/web-react'
import RootRouterProvider from '../src/router/provider'

const App = () => {
  return (
    <>
      <ConfigProvider>
        <RootRouterProvider></RootRouterProvider>
      </ConfigProvider>
    </>
  )
}

export default App
