import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';
import { UserData } from './userSlicer';

export const GetUsers = createAsyncThunk(
    'users/getUsers',
    async () => {

        try {
            const response = await axios.get(URL + `user/getallUser`, { withCredentials: true });
            return response.data.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Get user Failed");
        }
    }

)


export const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        user: null as UserData | null,
        error: null,
    },
    reducers: {

    },


    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as any;
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    }
})

export const usersReducer = userSlice.reducer;