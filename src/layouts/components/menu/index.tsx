import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu } from '@arco-design/web-react';
import { SubMenuComponent } from '../sub-menu';
import useLocale from '../../../utils/useLocale';
import { useSelector } from 'react-redux';

const MenuItem = Menu.Item;

const MenuComponent = () => {
  
  const routerReducer = useSelector((state: any) => state.routerReducer);
  const t = useLocale();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [routerList, setRouterList] = useState([]);
  const [selectRouter, setSelectRouter] = useState('home');
  const [openKeys, setOpenKeys] = useState(['/dashboard', '/multi']);
  const [width, setWidth] = useState(240);
  useEffect(() => {
    const { routers } = routerReducer;
    console.log(routerReducer, 'routes------')
    setRouterList(routers);
  }, []);

  useEffect(() => {
    setSelectRouter(pathname);
  }, [pathname]);

  const handlerToRouter = (key: string) => {
    navigate('../' + key);
  };

  return (
    <Menu
      selectedKeys={[selectRouter]}
      openKeys={openKeys}
      levelIndent={32}
      onClickMenuItem={handlerToRouter}
      onClickSubMenu={(_, openKeys) => {
        setOpenKeys(openKeys);
      }}

      hasCollapseButton
      style={{ width: width, height: 'calc(100% - 28px)' }}
    >
      {routerList.map((item: any) => {
        if (item.children) {
          return SubMenuComponent(item, t);
        }
        return (
          <MenuItem key={item.key}>
            {item.meta.icon ? item.meta.icon : ''}
            {t[item.meta.name]}
          </MenuItem>
        );
      })}
    </Menu>
  );
}


export default MenuComponent