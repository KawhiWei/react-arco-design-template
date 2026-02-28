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
                },
                // {
                //     id: '3',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '4',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '5',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '6',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '7',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '8',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '9',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '10',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '11',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '12',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '13',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '14',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '15',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '16',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '17',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '18',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '19',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '20',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '21',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '22',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // },
                // {
                //     id: '23',
                //     route: '/ancillary',
                //     componentPath: null,
                //     name: '验证配置',
                //     show: true,
                //     iconName: "ruleConfig",
                //     parentId: null,
                //     parentPaths: Array<string>,
                //     children: []
                // }
            ])
        })
    })
}
