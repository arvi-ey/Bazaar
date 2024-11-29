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
            console.log(data)
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

export const DeleteAddress = createAsyncThunk(
    'address/deleteAddress', async (id: string) => {
        try {
            const response = await axios.delete(URL + `address/updateuseraddress/${id}`, { withCredentials: true });
            if (response.data.success === true) {
                return response.data.data
            }
        }
        catch (error: any) {
            return error.response.data
        }
    }
)

export interface Update {
    id: string,
    data: Address
}

export const UpdateAddress = createAsyncThunk(

    'address/updateAddress', async (value: Update) => {
        try {
            const response = await axios.patch(URL + `address/updateuseraddress/${value.id}`, value.data)
            if (response.data.success === true) {
                console.log(response.data.data)
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
            .addCase(DeleteAddress.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(DeleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = state.address.filter(data => data._id !== action.payload._id)
            })
            .addCase(DeleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            })
            .addCase(UpdateAddress.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(UpdateAddress.fulfilled, (state, action) => {
                state.loading = false;
                const updatedData = action.payload
                state.address = state.address.map(data => data._id === updatedData._id ? updatedData : data)
            })
            .addCase(UpdateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any
            }
            )

    }
})


export const addressReducer = addressSlice.reducer