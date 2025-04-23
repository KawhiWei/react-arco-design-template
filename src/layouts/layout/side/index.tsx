import {
    IconMenuFold,
    IconMenuUnfold,
} from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';

import { Button } from '@arco-design/web-react';
import MenuComponent from './menu';

const SliderMenu = () => {
    const [collapse, setCollapse] = useState(false);
    useEffect(() => {

    }, [collapse])
    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: '64px', lineHeight: '64px', padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        style={{
                            padding: '0 12px',
                            marginBottom: 4,
                        }}
                        type='primary'
                        onClick={() => setCollapse(!collapse)}
                    >
                        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
                    </Button>
                </div>
            </div>
            <div style={{ height: 'calc(100% - 64px)' }}>
                <MenuComponent collapse={collapse} />
            </div>
        </div>
    )
}
export default SliderMenu