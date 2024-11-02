import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';



export interface UserData {
    name: string,
    email: string,
    phone_number: string,
    password: string,
    address?: [],
    userType: string,
    profile_picture?: string,
    cart?: [],
    orders?: [],
    _id: string

}


export const GetUserInfo = createAsyncThunk(
    'user/getUser',
    async (userId: string) => {

        try {
            const response = await axios.get(URL + `user/getUser/${userId}`, { withCredentials: true });
            return response.data.data;
        }
        catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Get user Failed");
        }
    }

)




export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null as UserData | null,
        error: null,
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(GetUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as any;
            })
            .addCase(GetUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    }
})

export const userReducer = userSlice.reducer;