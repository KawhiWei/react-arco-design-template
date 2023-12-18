import {
    filterRouters,
    getRoutersStore,
    setRoutersStore
} from '../../utils/router';

import { createSlice } from '@reduxjs/toolkit'
import { localRouters } from '../../routers';

export const routerSlice = createSlice({
    name: 'router',
    /**
     * 初始化
     */
    initialState: {
        routers: getRoutersStore() || [],
        currentRouter: {}
    },
    reducers: {
        setRouters: (state: any) => {
            const routers = filterRouters(localRouters, state);
            setRoutersStore(routers);
        },
    }
})

export const { setRouters } = routerSlice.actions
const routerReducer = routerSlice.reducer;
export default routerReducer;