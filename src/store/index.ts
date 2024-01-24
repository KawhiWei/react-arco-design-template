import { accessTokenSlice } from './reducers/user-slice';
import { routerReducer } from './reducers/router';
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    reducer: {
        [accessTokenSlice.name]: accessTokenSlice.reducer,
        [routerReducer.name]: routerReducer.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
