import { SET_ROUTERS } from '../../store/action_types';

/**
 * @description 获取路由
 * @param {Array} payload
 * @returns
 */
export const setRoutersHandler = (data: []) => () => {
  // const { data } = {
  //   data: [
  //     {
  //       path: '/dashboard',
  //       key: 'dashboard',
  //       children: [
  //         {
  //           path: 'workplace',
  //           key: 'workplace'
  //         }
  //       ]
  //     },
  //   ]
  // };
  console.log('data:', data)
  // dispatch({
  //   type: SET_ROUTERS,
  //   payload: data
  // });

  return {
    type: 'routerReducer/setRouters',
    payload: data
  }
};
