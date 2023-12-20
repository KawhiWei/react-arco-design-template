import { accessTokenSlice } from './reducers/user-slice';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        [accessTokenSlice.name]: accessTokenSlice.reducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
