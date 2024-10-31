import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';
export interface authState {
    name: string,
    email: string,
    phone_number: string,
    password: string,
}

export interface SignInState {
    email: string,
    password: string,
}

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData: authState) => {
        try {
            const response = await axios.post(URL + `auth/signup`, userData);
            if (response.data.data) {
                return response.data.data;
            }
        } catch (error: any) {
            return error
        }
    }
);

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (userData: SignInState) => {
        try {
            const response = await axios.post(URL + `auth/signin`, userData);
            if (response.data.authenticate === true && response.data.user && response.data.session) {
                localStorage.setItem('token', response.data.session)
                return response.data.user;
            }
        } catch (error: any) {
            return error
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    },
})

export const authReducer = authSlice.reducer;