import { useEffect, useState } from "react";

import { Menu } from "@arco-design/web-react";
import { getMenuList } from "../../../api/auth";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuComponent = () => {
    const [defaultOpenKeys, setDefaultOpenKeys] = useState(['2']);
    const [menus, setMenus] = useState(Array<any>);
    useEffect(() => {
        getMenuList().then(res => {
            setMenus(res)
            var tress = transferTreeMenuData(res)
            console.log('tress-----------', tress)
        })
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

    const SubMenuComponent = (item: any) => {
        return (
            <SubMenu
                key={item.id}
                title=
                {
                    <span>{item.name}</span>
                }>
                {item.children.map((childItem: any) => {
                    if (childItem.children.length > 0) {
                        return SubMenuComponent(childItem);
                    }

                    return <MenuItem key={childItem.id}>
                        <Link to={childItem.path}>{childItem.name}</Link>
                    </MenuItem>
                })
                }
            </SubMenu>
        )
    }

    return (
        <Menu
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={['2']}
            levelIndent={32}>
            {transferTreeMenuData(menus).map((item: any) => {
                if (item.children.length > 0) {
                    return SubMenuComponent(item);
                } else {
                    return (
                        <MenuItem key={item.id}>
                            <Link to={item.route || ''}>{item.name}</Link>
                        </MenuItem>
                    );
                }

            })}

        </Menu>
    );

}


export default MenuComponent