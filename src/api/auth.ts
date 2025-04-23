export const getMenuList = () => {
    return new Promise<Array<any>>((resolve) => {
        window.setTimeout(() => {
            resolve([
                {
                    id: '1',
                    route: '/dashboard',
                    componentPath: '/dashboard/index.tsx',
                    name: '仪表盘',
                    show: true,
                    icon: null,
                    parentId: null,
                    parentPaths: Array<string>,
                    children: [],
                },
                {
                    id: '2',
                    route: '/system',
                    componentPath: null,
                    name: '系统管理',
                    show: true,
                    icon: null,
                    parentId: null,
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-1',
                    route: '/user',
                    componentPath: '/user/index.tsx',
                    name: '用户管理',
                    show: true,
                    icon: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                }
            ])
        })
    })
}