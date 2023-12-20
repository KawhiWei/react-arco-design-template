import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfoHandler, setPermission } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentLocalRouter } from '../../utils/router';
import { setting } from '../../config/setting';

const { loginInterception, title } = setting;

const RequireAuth = ({ children }: any) => {
    debugger
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    
    const userReducer = useSelector((state: any) => state.userReducer);

    if (!userReducer) {
        return children;
    }
    const { accessToken, permissions } = userReducer;

    const localRouter = getCurrentLocalRouter(pathname);
    // 窗口标题
    document.title = (localRouter ? localRouter.title + '-' : '') + title;

    // 登录状态
    if (accessToken) {
        // 登录状态到登录页自动呢跳转到首页
        if (pathname === '/') return <Navigate to="/dashboard/workplace" replace />;

        // 获取权限
        const hasPermissions = permissions && permissions.length;

        if (!hasPermissions) {
            let permissionData;

            try {
                if (!loginInterception) {
                    let result = setPermission(['admin'], (data: any) => {
                        permissionData = data;
                    })
                    dispatch(
                        result
                    );
                } else {
                    let userInfoResult = getUserInfoHandler((data: any) => {
                        // eslint-disable-next-line no-unused-vars
                        permissionData = data;
                    })
                    dispatch(
                        userInfoResult
                    );
                }
            } catch {
                console.log(22);
            }
        }

        return children;
    }
    if (pathname !== '/') return <Navigate to="/" replace />;
    return children;
}
export default RequireAuth;