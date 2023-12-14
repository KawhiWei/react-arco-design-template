import {
  localStorageGet,
  localStorageRemove,
  localStorageSet
} from './index';

import { setting } from '../config/setting';

const { tokenName } = setting;
export function getAccessToken() {
  return localStorageGet(tokenName);
}
export function setAccessToken(accessToken: string) {
  return localStorageSet(tokenName, accessToken);
}

export function removeAccessToken() {
  return localStorageRemove(tokenName);
}
