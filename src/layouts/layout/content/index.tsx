import { Breadcrumb } from '@arco-design/web-react';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';

import { getMenuList } from '../../../api/auth';

interface MenuInfo {
    name: string;
    parentPaths: string[];
}

const PublicContent = () => {
    const { pathname } = useLocation();
    const matches = useMatches();
    const [menuMap, setMenuMap] = useState<Record<string, MenuInfo>>({});

    useEffect(() => {
        getMenuList().then(res => {
            const map: Record<string, MenuInfo> = {};

            const buildMap = (menus: any[], parentMenu?: any) => {
                const parentId = parentMenu ? parentMenu.id : null;
                menus
                    .filter(item => item.parentId === parentId)
                    .forEach(item => {
                        const parentPaths = parentMenu?.parentPaths || [];
                        const lastPath = parentPaths.length > 0 ? parentPaths[parentPaths.length - 1] : '';
                        const path = (parentMenu ? `${lastPath}${item.route}` : item.route) || '';
                        if (path) {
                            map[path] = { name: item.name, parentPaths };
                        }
                        buildMap(menus, {
                            ...item,
                            parentPaths: [...parentPaths, path || ''].filter(o => o),
                        });
                    });
            };

            buildMap(res);
            setMenuMap(map);
        });
    }, []);

    const breadcrumbItems = useMemo(() => {
        const currentPath = pathname;
        const current = menuMap[currentPath];
        if (!current) {
            const lastMatch = matches[matches.length - 1];
            const handle = lastMatch?.handle as { name?: string } | undefined;
            return handle?.name ? [{ key: currentPath, label: handle.name }] : [];
        }

        return [...current.parentPaths, currentPath].map(path => ({
            key: path,
            label: menuMap[path]?.name || path,
        }));
    }, [menuMap, matches, pathname]);


    return (

        <Suspense>
            {breadcrumbItems.length > 0 && (
                <div className="layout-content-header">
                    <Breadcrumb className="layout-content-breadcrumb">
                        {breadcrumbItems.map(item => (
                            <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>
            )}
            <div className="layout-main-content" >
                <Outlet />
            </div>

        </Suspense>
    )
}
export default PublicContent
