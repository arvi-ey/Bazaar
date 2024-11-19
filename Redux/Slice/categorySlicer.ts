import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';
import { GetProduct } from './productsSlicer';

export interface Category {
    categoryName: string,
    categoryImage: string,
    _id: string;
}

export interface AddCategory {
    categoryName: string,
    categoryImage: string,
}

export interface UpdateCategory {
    data: Category;
    id: string;
}


export const GetAllCategory = createAsyncThunk('getCategory', async () => {
    try {
        const response = await axios.get(URL + `category/getallcategory`, { withCredentials: true });
        return response.data.data;
    }
    catch (error: any) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get categories");
    }
})

export const AddCategory = createAsyncThunk(
    'addcategory',
    async (data: AddCategory) => {
        try {
            const response = await axios.post(URL + `category/addcategory`, data, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add categories");
        }
    }
)


export const UpdateCategory = createAsyncThunk(
    'updatecategory',
    async ({ data, id }: UpdateCategory) => {
        try {
            const response = await axios.patch(URL + `category/updatecategory/${id}`, data, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Update Category");
        }
    }
)

export const DeleteCategory = createAsyncThunk(
    'deletecategory', async (id: string) => {
        try {
            const response = await axios.delete(URL + `category/updatecategory/${id}`, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to delete category");
        }
    }
)

export const GetProductsByCategory = createAsyncThunk('category/getproducts', async (data: string) => {
    try {
        const response = await axios.get(URL + `products/getproductcategory/${data}`, { withCredentials: true })
        return response.data
    }
    catch (error: any) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
})


export const categorySlice = createSlice(
    {
        name: "category",
        initialState: {
            loading: false,
            category: [] as Category[],
            productByCategory: [] as GetProduct[],
            error: null,
        },
        reducers: {},

        extraReducers: (builder) => {
            builder
                .addCase(GetAllCategory.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(GetAllCategory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.category = action.payload;
                })
                .addCase(GetAllCategory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as any;
                })
                .addCase(AddCategory.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(AddCategory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.category = [...state.category, action.payload.data]
                })
                .addCase(AddCategory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as any;
                })
                .addCase(UpdateCategory.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(UpdateCategory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.category = state.category.map(category => category._id === action.payload.data._id ? action.payload.data : category);
                })
                .addCase(UpdateCategory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as any;
                })
                .addCase(DeleteCategory.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(DeleteCategory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.category = state.category.filter(data => data._id !== action.payload.data._id)
                })
                .addCase(DeleteCategory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as any;
                })
                .addCase(GetProductsByCategory.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(GetProductsByCategory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.productByCategory = action.payload;
                })
                .addCase(GetProductsByCategory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as any;
                })
        }
    }
)


export const CategoryReducer = categorySlice.reducer