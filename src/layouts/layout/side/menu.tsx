import { useEffect, useState } from "react";

import { Menu } from "@arco-design/web-react";
import { getMenuList } from "../../../api/auth";
import { Link, useMatches } from "react-router-dom";
import {
    IconApps,
    IconMenuUnfold,
} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
interface IProp {
    collapse: boolean;
}

const MenuComponent = (props: IProp) => {

    const matches = useMatches();
    const [defaultOpenKeys, setDefaultOpenKeys] = useState(['2']);
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(['2']);

    const [menus, setMenus] = useState(Array<any>);
    useEffect(() => {
        getMenuList().then(res => {
            setMenus(res)
            var tress = transferTreeMenuData(res)
            console.log('tress-----------', tress)
        });
        // const [match] = matches || [];
        // // 获取当前匹配的路由，默认为最后一个
        // const route = matches[matches.length - 1];
        // // 从匹配的路由中取出自定义参数
        // const handle = route?.handle as { parentPaths: [], path: string };
    }, [])
    const transferTreeMenuData = (menus: any[], parentMenu?: any): any[] => {
        const parentId = parentMenu ? parentMenu.id : null;
        return menus.filter(item => item.parentId === parentId).map(item => {
            const parentPaths = parentMenu?.parentPaths || [];
            const lastPath = parentPaths.length > 0 ? parentPaths[parentPaths.length - 1] : '';
            const path = (parentMenu ? `${lastPath}${item.route}` : item.route) || '';
            return {
                ...item,
                path,
                parentPaths,
                children: transferTreeMenuData(menus, {
                    ...item, parentPaths: [...parentPaths, path || ''].filter(o => o),
                })

            }
        });

        // return menus.filter(item => item.parentId === parentId).map(item => ({
        //     ...item,
        //     children: transferTreeMenuData(menus, item.id)
        // }));
    }
    const onClickMenuItem = (menus: any) => {
        console.log('menus', menus)
    };

    const SubMenuComponent = (item: any) => {

        return (
            <SubMenu
                key={item.id}
                title=
                {
                    <span><IconApps />{item.name}</span>
                }>
                {item.children.map((childItem: any) => {
                    if (childItem.children.length > 0) {
                        return SubMenuComponent(childItem);
                    }
                    return (
                        <Link to={childItem.path}>
                            <MenuItem key={childItem.id} title={childItem.name}>

                                <span><IconMenuUnfold />{childItem.name}</span>
                            </MenuItem>
                        </Link>)
                })
                }
            </SubMenu>
        )
    }

    return (
        <Menu
            style={{ height: '100%' }}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            levelIndent={32}
            accordion={true}
            collapse={props.collapse}
            onClickMenuItem={onClickMenuItem}>
            {transferTreeMenuData(menus).map((item: any) => {
                if (item.children.length > 0) {
                    return SubMenuComponent(item);
                } else {
                    return (
                        <Link to={item.route || ''}>
                            <MenuItem key={item.id}>
                                <span><IconMenuUnfold />{item.name}</span>
                            </MenuItem>
                        </Link>
                    );
                }

            })}

        </Menu>
    );

}


export default MenuComponent