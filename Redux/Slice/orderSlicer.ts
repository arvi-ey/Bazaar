import { URL } from "@/config";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { RemoveFromCart } from "./cartSlicer";

export interface OrderData {
    productId: string;
    _id: string;
    userId: string;
    totalPrice: number;
    quantity: number;
    deliveryTime: number;
    size: string;
    image: string;
    productTitle: string;
    paymentMode: string;
    orderDate: number;
    orderAddress?: string;
    paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
    orderStatus: 'PLACED' | 'SHIPPED' | 'OUT FOR DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
}

export const PlaceOrder = createAsyncThunk(
    'order/placeorder', async (data: OrderData) => {
        try {
            const response = await axios.post(URL + `order/placeorder`, data)
            // console.log(response.data)
            if (response.data && response.data.order === true) return response.data.data
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

export const GetOrderById = createAsyncThunk(
    'order/getsingleorder', async (id: string) => {
        try {
            const response = await axios.get(URL + `order/getsingleorder/${id}`)
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
        error: null,
        singleOrder: null
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
                    // console.log(action.payload)
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
            .addCase(GetOrderById.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetOrderById.fulfilled, (state, action) => {
                state.singleOrder = action.payload
            })
    }
})

export const orderReducer = orderSlice.reducer