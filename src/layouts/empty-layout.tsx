import { Outlet } from 'react-router-dom';
import React from 'react';

function EmptyLayout() {
  return (
    <div className="app-container-full">
      <Outlet />
    </div>
  );
}

export default React.memo(EmptyLayout);
