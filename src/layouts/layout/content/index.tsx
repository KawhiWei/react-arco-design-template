import { Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';

const PublicContent = () => {
    const [isDark, setIsDark] = useState(() => document.body.getAttribute('arco-theme') === 'dark');

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.body.getAttribute('arco-theme') === 'dark');
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['arco-theme'] });
        return () => observer.disconnect();
    }, []);

    return (

        <Suspense>

            <div className="layout-main-content" style={isDark ? { color: '#fff' } : undefined}>
                <Outlet />
            </div>

        </Suspense>
    )
}
export default PublicContent