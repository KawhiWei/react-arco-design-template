import { Button, ConfigProvider } from '@arco-design/web-react';
import store, { RootState } from './store';

import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from './context';
import RenderRouter from './routers';
import { accessTokenActions } from './store/reducers/user-slice'
import enUS from '@arco-design/web-react/es/locale/en-US';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';

const App = () => {
  const accessToken = useSelector((state: RootState) => state.accessToken);
  const [lang, setLang] = useState('zh-CN');
  const [theme, setTheme] = useState('light');

  const contextVal = { lang, setLang, theme, setTheme };

  const testLogin = () => {
    debugger
    store.dispatch(accessTokenActions.setAccessToken("abcdefg001"));
  };

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
          <GlobalContext.Provider value={{
            lang: contextVal.lang,
            setLang: () => {
              contextVal.setLang
            },
            theme: contextVal.theme,
            setTheme: () => {
              contextVal.setTheme
            },
          }}>
            <BrowserRouter>
              <RenderRouter />
            </BrowserRouter>
            {/* <span>{accessToken.accessToken}</span>
            <Button type='primary' onClick={testLogin}>Primary Token</Button> */}
          </GlobalContext.Provider>
        </ConfigProvider>
      </div>
    </>
  )
}

export default App
