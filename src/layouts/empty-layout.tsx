import React, { Suspense } from 'react';

import LoadingComponent from '@/components/loading';
import { Outlet } from 'react-router-dom';

const load = (children: any) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;

function EmptyLayout() {
  return (
    <div className="app-container-full">
      {load(<Outlet />)}
      {/* <Outlet /> */}
    </div>
  );
}

export default React.memo(EmptyLayout);
