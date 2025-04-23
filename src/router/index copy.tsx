import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';

import ErrorPage from '../components/error';
import Login from '../pages/login';

// 快速导入工具函数
// 定义一个懒加载函数，参数为模块名
const lazyLoad = (moduleName: string) => {

    /**
     * 这个和以前lazy(() => import('./pages/page1/index.tsx'))方法差不多啊，为啥要用import.meta.glob。因为import参数不支持变量，只能是写死的路径。
     */
    const modules: any = import.meta.glob('../pages/**/*.tsx') // 在vite中必须这样动态引入所有组件地址
    // 使用lazy函数加载模块
    const Module = lazy(modules[`../pages/${moduleName}/index.tsx`])

    // 返回一个Suspense组件，用于处理懒加载时的加载状态
    return (
        <Suspense fallback={< div > Loading...</div>}>
            < Module > </Module>
        </Suspense>
    )
}

// 定义默认的路由表
export const defRouter: Array<any> = [
    // 需要在路由最前面添加 优先匹配 重定向
    {
        path: '/',
        name: '',
        isShow: false,
        element: <Navigate to={'/home'} />
    },
    {
        path: '/login',
        name: '登录',
        isShow: false,
        element: <Login></Login>
    },
    {
        /* 
        现在路由如果没有匹配到，会加载react-router默认404页面，
        需要改成我们自己的404页面。 只需要在路由后面加一个通配符的路由就行了，
        表示其他路由没匹配到，才配置这个路由。
        我测试了一下这个路由可以加在任何位置，不像以前版本，必须放在最后。 */
        path: '*',
        name: '404',
        isShow: false,
        element: <ErrorPage></ErrorPage>
    },
]

// 假设后台给我们返回了一个菜单
const menu = [
    {
        "id": 8,
        "name": "主页",
        "icon": "icon-aliens-fill",
        "path": "/dashboard",
        "component": "dashboard", // 上面说到了组件文件夹名大写并在子文件index.tsx中实现
        "sort_num": 1,
        "redirectTo": "",
        "parent_id": null,
        "isShow": true,
        "create_time": "2023-03-17T08:06:21.283Z"
    }
]

// 根据菜单筛选路由
const filterAsyncRouter = (menus: Array<any> = []) => {
    const addRouter: Array<any> = []
    menus.forEach((item: any) => {
        const route: any = {
            name: item.name,
            path: item.path,
            isShow: item.isShow,
            element: ''
        }

        route.element = lazyLoad(item.component) // 懒加载路由
        if (item.children) {
            route.children = filterAsyncRouter(item.children) // 如有有嵌套路由则递归加载
        }

        addRouter.push(route)
    })
    return addRouter  // 返回动态路由表
}

// 合并路由
const marRouter = (arr: any) => {
    return [
        ...defRouter,  // 上面我们配置了默认路由
        ...arr// 将异步路由合并到
    ]
}

const RouterCom = () => {
    // 定义一个状态变量routerList，用于存储路由列表
    // 定义一个状态变量routerList，用于存储路由列表
    const [routerList, setRouterList] = useState<Array<any>>([])
    // useEffect钩子函数，在menu发生变化时执行
    // useEffect钩子函数，在menu发生变化时执行

    // 过滤异步路由
    // 过滤异步路由
    useEffect(() => {
        const asyncArr = filterAsyncRouter(menu)
        setRouterList(marRouter(asyncArr)) // 合并异步路由
    }, [menu])

    const routes = useRoutes(routerList) // 生成路由表结构
    return routes
}

export default RouterCom // 返回给APP.tsx使用
