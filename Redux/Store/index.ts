import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../Slice/authSlicer'
import { userReducer } from '../Slice/userSlicer';
import { usersReducer } from '../Slice/usersSlicer';
import { bannerReducer } from '../Slice/bannerSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        banner: bannerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


