import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { URL } from "../../config"
import axios from 'axios';


export interface Address {
    label: string,
    userId?: string,
    street: string,
    city: string,
    state: string,
    pinCode: string,
    _id?: string,
    landmark: string,
    addressType: string,
    isDefault?: boolean
}

export const AddAddress = createAsyncThunk(
    'address/addaddress', async (data: Address) => {
        try {
            const response = await axios.post(URL + 'address/addaddress', data)
            if (response.data.success === true) {
                return response.data.data
            }
        }
        catch (error: any) {
            return error.response.data
        }
    }
)


export const GetAddress = createAsyncThunk(
    'address/getAddress', async (id: string) => {
        try {
            const response = await axios.get(URL + `address/getuseraddress/${id}`);
            if (response.data.success === true) {
                return response.data.data
            }
        }
        catch (error: any) {
            return error.response.data
        }
    }
)


export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: [] as Address[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddAddress.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(AddAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = [...state.address, action.payload]
            })
            .addCase(AddAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            })
            .addCase(GetAddress.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload
            })
            .addCase(GetAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            })
    }
})


export const addressReducer = addressSlice.reducer