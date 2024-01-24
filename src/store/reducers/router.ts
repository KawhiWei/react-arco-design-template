// 引入action_type
// import { SET_ROUTERS } from '@/store/action_types';
import {
  getRoutersStore, setRoutersStore, filterRouters
} from '@/utils/router';
import { localRouters } from '@/routers';
import { createSlice } from '@reduxjs/toolkit';

export const routerReducer = createSlice({
  name: 'routerReducer',
  initialState: {
    routers: getRoutersStore() || [],
    currentRouter: {}
  },
  reducers: {
    setRouters(state, action) {
      const routers = filterRouters(localRouters, action.payload);
      setRoutersStore(routers);
      state.routers = routers
    }
  }
})

export const { setRouters } = routerReducer.actions