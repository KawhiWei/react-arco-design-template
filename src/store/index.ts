import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-slice';

const store = configureStore({
    reducer: {
        userState: userReducer
    }
});

export default store;
