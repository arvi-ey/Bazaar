import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
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
            if (response.data.user === true && response.data.data !== null) {
                return response.data.data;
            }
        } catch (error: any) {
            return isRejectedWithValue(error.response?.data?.message || "Sign up failed");
        }
    }
);

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (userData: SignInState) => {
        try {
            const response = await axios.post(URL + `auth/signin`, userData, { withCredentials: true });
            if (response.data.authenticate === true && response.data.user && response.data.session) {
                return response.data.user;
            }
            return isRejectedWithValue("Sign in failed");
        } catch (error: any) {
            // console.log(error)
            return isRejectedWithValue(error.response?.data?.message || "Sign in failed");
        }
    }
);

export const AppSignIn = createAsyncThunk(
    'auth/appSignIn',
    async (userData: SignInState) => {
        try {
            const response = await axios.post(URL + `auth/signin`, userData, { withCredentials: true });
            if (response.data.authenticate === true && response.data.user && response.data.session) {
                await SecureStore.setItemAsync("uid", response.data.session)
                return response.data.user
            }
            return isRejectedWithValue("Sign in failed");
        } catch (error: any) {
            // console.log(error)
            return isRejectedWithValue(error.response?.data?.message || "Sign in failed");
        }
    }
)

export const CheckAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const result = await SecureStore.getItemAsync("uid")
        if (result) return result
        else return null;
    }
)


export const GetUserOnce = createAsyncThunk(
    'auth/getuseronce',
    async (req, res) => {
        const session = await CheckAuth()
        if (session !== null) {
            try {
                const response = await axios.get(URL + `user/checkappauth`, {
                    headers: {
                        Authorization: `Bearer ${session}`
                    }
                });
                console.log(response)
                return response.data.data;
            }
            catch (error: any) {
                return isRejectedWithValue(error.response?.data?.message || "Session  failed");
            }

        }
        else return null
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        uid: null,
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