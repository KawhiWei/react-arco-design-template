import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const PublicContent = () => {
    return (

        <Suspense>

            <div className="layout-main-content" >
                <Outlet />
            </div>

        </Suspense>
    )
}
export default PublicContent
