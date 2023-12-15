import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from '../../utils/accessToken';

import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    /**
     * 初始化
     */
    initialState: {
        accessToken: getAccessToken(),
        username: '',
        avatar: '',
        permissions: []
    },
    reducers: {
        login: (state: any) => {
            state.isLoading = true
        },
        logout: () => {
            removeAccessToken();
        },
        setAccessToken: (_accessToken: any) => {
            setAccessToken(_accessToken)
        },
    }
})

export const { login } = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer;