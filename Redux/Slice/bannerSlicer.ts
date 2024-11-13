import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';

export interface Banner {
    image: string
    title: string,
    _id: string;
}

export interface AddBanner {
    image: string
    title: string,
}
interface UpdateBannerPayload {
    data: Banner;
    id: string;
}
export const GetBanners = createAsyncThunk(
    'getbanners',
    async () => {

        try {
            const response = await axios.get(URL + `banner/allbanners`, { withCredentials: true });
            return response.data.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Get banner Failed");
        }
    }
)

export const AddBanner = createAsyncThunk(
    'addbanner',
    async (data: AddBanner) => {
        try {
            const response = await axios.post(URL + `banner/addbanner`, data, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add Banner");
        }
    }
)

export const UpdateBanner = createAsyncThunk(
    'updateddbanner',
    async ({ data, id }: UpdateBannerPayload) => {
        try {
            const response = await axios.patch(URL + `banner/updatebanner/${id}`, data, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Update Banner");
        }
    }
)


export const DeleteBanner = createAsyncThunk(
    'deletebanner',
    async (id: string) => {
        try {
            const response = await axios.delete(URL + `banner/updatebanner/${id}`, { withCredentials: true });
            return response.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to delete banner");
        }
    }
)

export const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        loading: false,
        banner: [] as Banner[],
        error: null,
    },
    reducers: {

    },


    extraReducers: (builder) => {
        builder
            .addCase(GetBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = action.payload as any;
            })
            .addCase(GetBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(AddBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = [...state.banner, action.payload.data as Banner];
            })
            .addCase(AddBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(UpdateBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateBanner.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBanner = action.payload.data as Banner;
                state.banner = state.banner.map((banner) =>
                    banner._id === updatedBanner._id ? updatedBanner : banner
                );
            })
            .addCase(UpdateBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(DeleteBanner.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = state.banner.filter(banner => banner._id !== action.payload.data._id)
            })
            .addCase(DeleteBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    }
})

export const bannerReducer = bannerSlice.reducer;