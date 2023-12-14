// 分别引入各个模块的reducer，可以优化不必每次都单独模块引入

import routerReducer from './router';
import userReducer from './user';

// 合并reducer
function combineReducers(reducers: any) {
  const reducerKeys = Object.keys(reducers);
  return (state = {}, action: any) => {
    const nextState = {};
    reducerKeys.forEach((reducerKey: any) => {
      nextState[reducerKey] = reducers[reducerKey](state[reducerKey], action);
    });

    return nextState;
  };
}

// 导出reducer
export default combineReducers({ userReducer, routerReducer });
