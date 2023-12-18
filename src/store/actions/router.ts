import { SET_ROUTERS } from '../../store/action_types';

/**
 * @description 获取路由
 * @param {Array} payload
 * @returns
 */
export const setRoutersHandler = () => async (dispatch: any) => {
  const { data } = {
    data: []
  };
  dispatch({
    type: SET_ROUTERS,
    payload: data
  });
};
