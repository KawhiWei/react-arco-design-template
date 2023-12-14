// 引入action_type

import {
  filterRouters,
  getRoutersStore,
  setRoutersStore
} from '../../utils/router';

import { SET_ROUTERS } from '../../store/action_types';
import { localRouters } from '../../routers';

// 初始化
const initState = {
  routers: getRoutersStore() || [],
  currentRouter: {}
};

export default function routerReducer(state = initState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROUTERS: {
      const routers = filterRouters(localRouters, payload);
      setRoutersStore(routers);
      return Object.assign(state, {
        routers
      });
    }
    default:
      return state;
  }
}
