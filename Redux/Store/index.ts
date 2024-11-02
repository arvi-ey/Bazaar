import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../Slice/authSlicer'
import { userReducer } from '../Slice/userSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

