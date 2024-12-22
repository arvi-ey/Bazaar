import { URL } from "@/config";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { RemoveFromCart } from "./cartSlicer";

export interface OrderData {
    productId: string;
    userId: string;
    totalPrice: number;
    quantity: number;
    deliveryTime: number;
    size: string;
    image: string;
    productTitle: string;
    paymentMode: string;
    paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
    orderStatus: 'PLACED' | 'SHIPPED' | 'OUT' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
}

export const PlaceOrder = createAsyncThunk(
    'order/placeorder', async (data: OrderData) => {
        try {
            const response = await axios.post(URL + `order/placeorder`, data)
            if (response.data && response.data.success === true) return response.data.data
        }
        catch (error: any) {
            return error.response.data
        }
    }
)


export const GetUserOrder = createAsyncThunk(
    'order/getuserorder', async (id: string) => {
        try {
            const response = await axios.get(URL + `order/getorder/${id}`)
            if (response.data && response.data.success === true) return response.data.data
        }
        catch (error: any) {
            return error.response.data
        }
    }
)

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderItems: [] as OrderData[],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PlaceOrder.pending, (state, action) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(PlaceOrder.fulfilled, (state, action) => {
                state.loading = false,
                    state.orderItems = [...state.orderItems, action.payload]
            })
            .addCase(PlaceOrder.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload as any
            })
            .addCase(GetUserOrder.pending, (state, action) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(GetUserOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orderItems = action.payload
            })
            .addCase(GetUserOrder.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload as any
            })
    }
})

export const orderReducer = orderSlice.reducer