// 引入action_type
// import { SET_ROUTERS } from '@/store/action_types';

import {
  getRoutersStore,
  setRoutersStore
} from '@/utils/router';

import { createSlice } from '@reduxjs/toolkit';

export const routerReducer = createSlice({
  name: 'routerReducer',
  initialState: {
    routers: getRoutersStore() || [],
    currentRouter: {}
  },
  reducers: {
    setRouters(state, action) {
      setRoutersStore(action.payload);
      state.routers = action.payload
    }
  }
})

export const { setRouters } = routerReducer.actions