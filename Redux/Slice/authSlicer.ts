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

export interface AuthState {
    loading: boolean;
    user: any | null; // Replace `any` with your actual user object type if known
    uid: string | null; // Allow uid to be either a string or null
    error: string | null;
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
            return error.response?.data
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
                await SecureStore.setItemAsync("session", response.data.session)
                await SecureStore.setItemAsync("uid", response.data.user._id)
                return response.data.user
            }
            return "Sign in failed"
        } catch (error: any) {
            return error.response?.data
        }
    }
)


export const GetUserOnce = createAsyncThunk(
    'auth/getuseronce',
    async () => {
        const session = await SecureStore.getItemAsync("session")
        if (session !== null) {
            try {
                const response = await axios.get(URL + `auth/checkappauth`, {
                    headers: {
                        Authorization: `Bearer ${session}`
                    }
                });
                // return response.data.id
                await SecureStore.setItemAsync("uid", response.data.id)
            }
            catch (error: any) {
                return isRejectedWithValue(error.response?.data?.message || "Session  failed");
            }

        }
        else {
            console.log("user is not logged in")
            return null
        }
    }
)

export const CheckAuth = createAsyncThunk(
    "auth/checkauh",
    async () => {
        const uid = await SecureStore.getItemAsync("uid")
        if (uid !== null) {
            return uid
        }
        else {
            return null
        }
    }
)

const initialState: AuthState = {
    loading: false,
    user: null,
    uid: null, // Initially null
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
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
            .addCase(GetUserOnce.pending, (state, action) => {
                state.loading = true;
                state.uid = null
            })
            // .addCase(GetUserOnce.fulfilled, (state, action: PayloadAction<string | null>) => {
            //     state.loading = false;
            //     state.uid = action.payload;
            // })
            .addCase(GetUserOnce.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(AppSignIn.pending, (state, action) => {
                state.loading = true
            })
            .addCase(AppSignIn.fulfilled, (state, action) => {
                state.loading = false
                state.uid = action.payload._id
            })
            .addCase(AppSignIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(CheckAuth.fulfilled, (state, action) => {
                state.uid = action.payload
            })
    },
})

export const authReducer = authSlice.reducer;