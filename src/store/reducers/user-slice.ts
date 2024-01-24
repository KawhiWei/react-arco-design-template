import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from '../../utils/accessToken';

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface AccessTokenState {
    accessToken: string
}

export const accessTokenSlice = createSlice({
    name: 'accessToken',
    /**
     * 初始化
     */
    initialState: {
        accessToken: getAccessToken(),
    } as AccessTokenState,
    reducers: {
        setAccessToken: (state: AccessTokenState, action: PayloadAction<string>) => {
            
            state.accessToken = action.payload;
            setAccessToken(action.payload);
        },
        removeAccessToken: () => {
            removeAccessToken();
        },
    }
})

export const accessTokenActions = accessTokenSlice.actions