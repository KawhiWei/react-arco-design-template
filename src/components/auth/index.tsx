import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '../../store';
import { getCurrentLocalRouter } from '../../utils/router';
import { setting } from '../../config/setting';
import { useSelector } from 'react-redux';

const { title } = setting;

const RequireAuth = ({ children }: any) => {

    const accessToken = useSelector((state: RootState) => state.accessToken);
    const { pathname } = useLocation();

    const userReducer = useSelector((state: any) => state.userReducer);

    if (!userReducer) {
        return children;
    }
    const localRouter = getCurrentLocalRouter(pathname);
    // 窗口标题
    document.title = (localRouter ? localRouter.title + '-' : '') + title;
    // 登录状态
    if (accessToken) {
        // 登录状态到登录页自动呢跳转到首页
        if (pathname === '/') {
            return <Navigate to="/dashboard/workplace" replace />;
        }
        return children;
    }
    if (pathname !== '/') {
        return <Navigate to="/" replace />
    };
    return children;
}
export default RequireAuth;