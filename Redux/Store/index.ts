import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../Slice/authSlicer'
import { userReducer } from '../Slice/userSlicer';
import { usersReducer } from '../Slice/usersSlicer';
import { bannerReducer } from '../Slice/bannerSlicer';
import { CategoryReducer } from '../Slice/categorySlicer';
import { ProductRedducer } from '../Slice/productsSlicer';
import { SinngleProductReducer } from '../Slice/productSlicer';
import { cartRducer } from "../Slice/cartSlicer"
import { addressReducer } from "../Slice/addressSlicer"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        banner: bannerReducer,
        category: CategoryReducer,
        product: ProductRedducer,
        singleproduct: SinngleProductReducer,
        cart: cartRducer,
        address: addressReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


