import { useEffect, useState } from 'react';

import { Breadcrumb } from '@arco-design/web-react';
import { getCurrentRouter } from '@/utils/router';
import useLocale from '@/utils/useLocale';
import { useLocation } from 'react-router-dom';

const BreadcrumbComponent = () => {
  
  const [breadcrumbs, setBreadCrumbs] = useState<Array<string>>([]);
  const { pathname } = useLocation();

  const t = useLocale();
  useEffect(() => {
    const currentPaths = pathname.split('/');
    const list = getCurrentRouter(currentPaths);
    setBreadCrumbs(list);
  }, [pathname]);
  return (
    <Breadcrumb
      style={{
        margin: '16px 0'
      }}
    >
      {breadcrumbs.map((item: any, index: any) => (
        <Breadcrumb.Item key={index}>
          {!index ? (
            <div className="breadcrumb-icon">
              {item.icon} <span className="arco-breadcrumb-item-separator icon-separator">/</span>{' '}
            </div>
          ) : (
            ''
          )}
          {t ? t[item.name] : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbComponent
