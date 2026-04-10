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
                    id: '3',
                    route: '/ai-agent',
                    componentPath: '/ai-agent/index.tsx',
                    name: '智 V V ',
                    show: true,
                    iconName: "aiAgent",
                    parentId: null,
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
                    id: '2-2',
                    route: '/field-value-mapping-config',
                    componentPath: '/field-value-mapping-config/index.tsx',
                    name: '字段取值配置',
                    show: true,
                    iconName: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-3',
                    route: '/product-config',
                    componentPath: '/product-config/index.tsx',
                    name: '产品配置',
                    show: true,
                    iconName: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-4',
                    route: '/sale-ref-id-mapping-config',
                    componentPath: '/sale-ref-id-mapping-config/index.tsx',
                    name: 'saleRefId 映射配置',
                    show: true,
                    iconName: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-5',
                    route: '/company-subject-mapping-config',
                    componentPath: '/company-subject-mapping-config/index.tsx',
                    name: '公司主体映射配置',
                    show: true,
                    iconName: null,
                    parentId: '2',
                    parentPaths: Array<string>,
                    children: []
                },
                {
                    id: '2-6',
                    route: '/dictionary-config',
                    componentPath: '/dictionary-config/index.tsx',
                    name: '字典配置',
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
