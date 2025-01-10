import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResProductT, ReqProductT } from "@/types/products";

import { API_URL } from "@/config/api";

type AdminProductT = {
    isLoading : boolean;
    productList : ResProductT[];
    error? : string | null
}

const initialState :AdminProductT = {
    isLoading : false,
    productList : [],
    error : null
}

export const getAllProducts = createAsyncThunk('/admin/getAllProducts' , async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/products/list`, {withCredentials : true});
        return response.data
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const addProduct = createAsyncThunk('/admin/add-product' , async (formData : ReqProductT, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/products/create`, formData, {withCredentials : true});
        return response.data
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const editProduct = createAsyncThunk('/admin/edit-product' , async ({formData, id}, {rejectWithValue}) => {
    console.log(formData , id)
    try {
        const response = await axios.post(`${API_URL}/products/edit/${id}`, formData, {withCredentials : true});
        return response.data
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const deleteProduct = createAsyncThunk('/admin/delete-products' , async ( productId : string | undefined, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${API_URL}/products/delete/${productId}` ,{withCredentials : true});
        return response.data
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})

export const adminProductSlice = createSlice({
    name : "admin-products",
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.success ? action?.payload?.data : []
        })
        .addCase(getAllProducts.rejected , (state , action) => {
            state.isLoading = false
            state.productList = []
            state.error = action.error.message || "Some error occured!"
        })
    }
})

export default adminProductSlice.reducer