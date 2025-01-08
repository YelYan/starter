import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "@/config/api";

export interface ImageT {
    file? : string | File
}

export const uploadImage = createAsyncThunk("/products/upload-image", async (formData : ImageT, {rejectWithValue}) => {
    try {
       const response = await axios.post(`${API_URL}/products/upload-image`, formData , {withCredentials : true , headers : {
        "Content-Type" : "multipart/form-data"
       }}); 
       return response.data
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong! Please try again")
    }
})

// export const adminslice = createSlice({
//     name : "admin",

// })