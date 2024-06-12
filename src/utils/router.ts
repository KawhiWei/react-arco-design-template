/**
 * @description 路由处理
 * @author hu-snail 1217437592@qq.com
 */

import {
  localStorageGet,
  localStorageRemove,
  localStorageSet
} from './index';

import { lazy } from 'react';

const routeMap = new Map();

export function getRoutersStore() {
  const localRouterList = JSON.parse(localStorageGet('routerList') ?? "[]");
  if (!localRouterList) {
    return []
  };
  return buildMenuByRouters(localRouterList)
}
export function buildMenuByRouters(routers: Array<any>) {
  const list: any = []
  routers.map((item: any, index: number) => {
    const { path, key, element, meta } = item

    const ele = {
      path,
      key,
      element: lazy(() => import(`@/pages/${element}`)),
      meta
    }
    if (item.children) {
      list.push(ele)
      list[index].children = buildMenuByRouters(item.children)
    } else {
      list.push({
        ...ele,
        children: null
      })
    }
  })

  return list
}

export function setRoutersStore(routerList: any) {
  return localStorageSet('routerList', routerList);
}

export function removeRoutersStore() {
  return localStorageRemove('routerList');
}

/**
 * @description 获取当前路由
 * @param {*} currentPaths 当前路由层级
 * @returns list
 */
export function getCurrentRouter(currentPaths: Array<string>): Array<string> {
  const list = [];
  for (let i = 0; i < currentPaths.length; i++) {
    const currentKey = currentPaths.slice(0, i * 1 + 1).join('/');
    if (routeMap.get(currentKey)) list.push(routeMap.get(currentKey));
  }
  return list;
}

/**
 * @description 获取某条本地路由信息
 * @param {String} key
 * @returns
 */
export function getCurrentLocalRouter(key: any) {
  return routeMap.get(key);
}
