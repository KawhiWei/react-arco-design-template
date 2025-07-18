import { RouteObject } from 'react-router-dom';
import { router } from '.';

export const toLoginPage = () => {
    router.navigate('/user/login');
}

function findNodeByPath(routes: RouteObject[], path: string) {
    for (let i = 0; i < routes.length; i += 1) {
        const element = routes[i];

        if (element.path === path) return element;

        findNodeByPath(element.children || [], path);
    }
}

export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
    if (!parentPath) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.routes.push(...routes as any);
        return;
    }

    const curNode = findNodeByPath(router.routes, parentPath);

    if (curNode?.children) {
        curNode?.children.push(...routes);
    } else if (curNode) {
        curNode.children = routes;
    }
}

export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
    if (!parentPath) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.routes.push(...routes as any);
        return;
    }

    const curNode = findNodeByPath(router.routes, parentPath);

    if (curNode) {
        curNode.children = routes;
    }
}