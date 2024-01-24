// ◆封装本地存储的操作

import {
  localStorageGet,
  localStorageRemove,
  localStorageSet
} from './index';

const TOKEN_KEY = 'ARCO_ADMIN_TEMPLATE';

export function getToken() {
  return localStorageGet(TOKEN_KEY);
}

export function setToken(token: any) {
  localStorageSet(TOKEN_KEY, token);
}

export function removeToken() {
  localStorageRemove(TOKEN_KEY);
}

export function hasToken() {
  return !!getToken();
}
