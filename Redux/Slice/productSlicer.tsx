import { URL } from "@/config";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export interface GetSingleProduct {
    _id?: string;
    description: string;
    price: number;
    category: string;
    stock?: number;
    images: string[];
    ratings?: number;
    numReviews?: number;
    title: string;
    createdAt?: Date;
    deliveryTime?: number;
}

interface SingleProductState {
    loading: boolean;
    product: GetSingleProduct | null; // Ensure `product` can be null
    error: string | null; // Error should also allow `null`
}

const initialState: SingleProductState = {
    loading: false,
    product: null,
    error: null,
};


export const GetSingleProduct = createAsyncThunk(
    'getSingleProduct', async (id: string) => {
        try {
            const response = await axios.get(URL + `products/getproduct/${id}`, { withCredentials: true });
            return response.data.data;
        } catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Get single product failed");
        }
    }
)
export const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(GetSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;

            })
    }

});

export const SinngleProductReducer = singleProductSlice.reducer;