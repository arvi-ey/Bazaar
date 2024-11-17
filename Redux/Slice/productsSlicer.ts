import { createAsyncThunk, createSelector, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { URL } from "../../config"
import axios from 'axios';

export interface GetProduct {
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
    deliveryTime?: number
}

export interface UpdateProduct {
    data: GetProduct;
    id: string;
}

export interface GetProductsData {
    page: number;
    limit: number;
    dsc: string;
}

export const GetAllProducts = createAsyncThunk('getallproducts', async () => {
    try {
        const response = await axios.get(URL + `products/getallproducts`, { withCredentials: true })
        return response.data.data
    }
    catch (error: any) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
})

export const GetProducts = createAsyncThunk('getproducts', async (data: GetProductsData) => {
    const { page, limit, dsc } = data;
    try {
        const response = await axios.get(URL + `products/getproducts?page=${page}&limit=${limit}&sort=${dsc}`, { withCredentials: true })
        return response.data
    }
    catch (error: any) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
})

export const AddProduct = createAsyncThunk(
    'addproduct',
    async (data: GetProduct) => {
        try {
            const response = await axios.post(URL + `products/addproduct`, data, { withCredentials: true });
            console.log(response.data.data)
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add categories");
        }
    }
)

export const UpdateProductData = createAsyncThunk(
    'updateddbanner',
    async ({ data, id }: UpdateProduct) => {
        try {
            const response = await axios.patch(URL + `products/updateproduct/${id}`, data, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Update Product");
        }
    }
)

export const DeleteProduct = createAsyncThunk(
    'deleteproduct', async (id: string) => {
        try {
            const response = await axios.delete(URL + `products/updateproduct/${id}`, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Delete Product");
        }
    })

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [] as GetProduct[],
        error: null,
        currentPage: 0,
        hasMore: true,
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
            .addCase(GetProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.data.length === 0) {
                    state.hasMore = false;
                } else {
                    state.products = [...state.products, ...action.payload.data];
                    // state.currentPage += 1;
                }
            })
            .addCase(GetProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(AddProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload.data];
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(UpdateProductData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) => product._id === action.payload.data._id ? action.payload.data : product);
            })
            .addCase(UpdateProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(DeleteProduct.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product._id !== action.payload.data._id);
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    }
})

export const ProductRedducer = productSlice.reducer