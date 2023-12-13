import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import { GlobalContext } from './context';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { useState } from 'react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
const App = () => {
  const [lang, setLang] = useState('zh-CN');
  const [theme, setTheme] = useState('light');

  const contextVal = { lang, setLang, theme, setTheme };

  const getLocale = () => {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  };
  return (
    <>
      <div className="app-container">
        <ConfigProvider locale={getLocale()}>
          <GlobalContext.Provider value={contextVal}>
            <BrowserRouter basename="/arco-admin-template">
              <RenderRouter />
            </BrowserRouter>
          </GlobalContext.Provider>
        </ConfigProvider>
      </div>
    </>
  )
}

export default App
