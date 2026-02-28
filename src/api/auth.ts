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
                    iconName: "dashboard",
                    parentId: null,
                    parentPaths: Array<string>,
                    children: [],
                },
                {
                    id: '1-1',
                    route: '/ai-agent',
                    componentPath: '/ai-agent/index.tsx',
                    name: 'AIAgent',
                    show: true,
                    iconName: "aiAgent",
                    parentId: '1',
                    parentPaths: Array<string>,
                    children: [],
                },
                {
                    id: '2',
                    route: '/ancillary',
                    componentPath: null,
                    name: '验证配置',
                    show: true,
                    iconName: "ruleConfig",
                    parentId: null,
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-1',
                    route: '/customer-rule',
                    componentPath: '/ancillary-customer-rule/index.tsx',
                    name: '销售单规则',
                    show: true,
                    iconName: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                }
            ])
        })
    })
}
