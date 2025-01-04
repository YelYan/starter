import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/api";
import { LoginFormT , RegisterFormT } from "@/types/auth";

export interface authStateT {
    isAuthenticated : boolean,
    isLoading : boolean,
    user : null
    error? : string | null
}

const initialState : authStateT = {
    isAuthenticated : false,
    isLoading : false,
    user : null,
    error : null
}

export const registerUser = createAsyncThunk("/auth/register" , async ( formData : RegisterFormT, {rejectWithValue}) => {
try {
    const response = await axios.post(`${API_URL}/auth/register`, formData , {withCredentials : true});
    return response.data
} catch (error : any) {
    return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
}
})

export const loginUser = createAsyncThunk("/auth/login" , async ( formData : LoginFormT, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, formData , {withCredentials : true});
        return response.data
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser : (state , action) => {
            state.user = action.payload || null
        },
    },
    extraReducers(builder) {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled , (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = true
        })
        .addCase(registerUser.rejected , (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = false
            state.error = action.error.message || "Register Failed! Please try again"
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled , (state , action) => {
            console.log(action , "user login check")
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated  = action.payload.success
        })
        .addCase(loginUser.rejected , (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = false
            state.error = action.error.message || "Login Failed! Please try again"
        })
    },
})

export const {setUser} = authSlice.actions

export default authSlice.reducer


