import React from "react";
import { Loading } from 'tdesign-react';

const GlobalLoading: React.FC = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading loading={true} size="medium" />
    </div>
)

export default GlobalLoading;
