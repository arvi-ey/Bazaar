import { URL } from "@/config";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export interface cartData {
    userId: string;
    product_id: string;
    _id?: string;
    description: string;
    price: number;
    category: string;
    stock?: number;
    image: string;
    ratings?: number;
    numReviews?: number;
    title: string;
    createdAt?: string;
    deliveryTime?: number;
}


export const AddToCart = createAsyncThunk(
    'cart/addtocart', async (data: cartData) => {
        try {
            const response = await axios.post(URL + `cart/addcart`, data)
            if (response.data.success === true) {
                return response.data.item
            }
        }
        catch (error: any) {
            return error.response.data
        }
    })

export const GetCartItems = createAsyncThunk(
    'cart/getitems', async (userId: string) => {
        try {
            const response = await axios.get(URL + `cart/getcartitems/${userId}`)
            if (response.data.success === true) {
                return response.data.data
            }
        }
        catch (error: any) {
            return error.response.data
        }
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartitems: [] as cartData[],
        loading: false,
        error: null
    },
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(AddToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(AddToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartitems = [...state.cartitems, action.payload]
            })
            .addCase(AddToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            })
            .addCase(GetCartItems.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartitems = action.payload
            })
            .addCase(GetCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            })
    }
})


export const cartRducer = cartSlice.reducer