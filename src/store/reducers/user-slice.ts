import {
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from '../../utils/accessToken';

import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: false,
        error: null
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