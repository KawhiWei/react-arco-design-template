import React from "react";
import { Spin } from '@arco-design/web-react';

const GlobalLoading: React.FC = () => (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spin size={30} dot></Spin>
        </div> */}

        <Spin size={20} dot loading></Spin>

    </div>


)

export default GlobalLoading;