import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResProductT, ReqProductT } from "@/types/products";

import { API_URL } from "@/config/api";

const singleProductVal = {
    image : "",
    title : "",
    description : "",
    category : "",
    brand : "",
    price : 0,
    salePrice : 0,
    totalStock : 0,
}

type AdminProductT = {
    isLoading : boolean;
    productList : ResProductT[];
    singleProduct? : ResProductT
    error? : string | null
}

const initialState :AdminProductT = {
    isLoading : false,
    productList : [],
    singleProduct : singleProductVal,
    error : null
}

export const getAllProducts = createAsyncThunk('/admin/getAllProducts' , async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/admin/products/list`, {withCredentials : true});
        return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const addProduct = createAsyncThunk('/admin/add-product' , async (formData : ReqProductT, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/admin/products/create`, formData, {withCredentials : true});
        return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})


export const editProduct = createAsyncThunk('/admin/edit-product' , async ({formData, id}: {formData : ReqProductT, id : string | undefined}, {rejectWithValue}) => {
    console.log(formData , id)
    try {
        const response = await axios.put(`${API_URL}/admin/products/edit/${id}`, formData, {withCredentials : true});
        return response.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})

export const getSingleProduct = createAsyncThunk('/admin/single-product' , async ( productId : string | undefined, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/admin/products/${productId}` ,{withCredentials : true});
        return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
       return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const deleteProduct = createAsyncThunk('/admin/delete-products' , async ( productId : string | undefined, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/products/delete/${productId}` ,{withCredentials : true});
        return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        .addCase(getSingleProduct.pending , (state) => {
            state.isLoading = true
        })
        .addCase(getSingleProduct.fulfilled , (state , action) => {
            state.isLoading = false
            state.singleProduct = action.payload.success ? action.payload?.data : {}
        })
        .addCase(getSingleProduct.rejected , (state , action) => {
            state.isLoading = false
            state.productList = []
            state.error = action.error.message || "Some error occured!"
        })

    }
})

export default adminProductSlice.reducer