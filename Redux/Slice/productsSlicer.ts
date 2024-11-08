import { createAsyncThunk, createSelector, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { URL } from "../../config"
import axios from 'axios';

export interface GetProduct {
    _id?: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    ratings?: number;
    numReviews?: number;
    title: string;
    createdAt?: Date;
    deliveryTime: number
}


export const GetAllProducts = createAsyncThunk('getallproducts', async () => {
    try {
        const response = await axios.get(URL + `products/getproducts`, { withCredentials: true })
        return response.data.data
    }
    catch (error: any) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
})


export const AddProduct = createAsyncThunk(
    'addbanner',
    async (data: GetProduct) => {
        try {
            const response = await axios.post(URL + `products/addproduct`, data, { withCredentials: true });
            console.log(response.data.data)
            return response.data.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add categories");
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [] as GetProduct[],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(GetAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(AddProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    }
})

export const ProductRedducer = productSlice.reducer