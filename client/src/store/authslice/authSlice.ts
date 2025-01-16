import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/api";
import { ReqLoginFormT , ReqRegisterFormT , ResLoginFormT} from "@/types/auth";

export interface authStateT {
    isAuthenticated : null | boolean,
    isLoading : boolean,
    user : null | ResLoginFormT
    error? : string | null
}

const initialState : authStateT = {
    isAuthenticated : null,
    isLoading : false,
    user : null,
    error : null
}

export const registerUser = createAsyncThunk("/auth/register" , async ( formData : ReqRegisterFormT, {rejectWithValue}) => {
try {
    const response = await axios.post(`${API_URL}/auth/register`, formData , {withCredentials : true});
    return response.data
} catch (error : any) {
    return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
}
})

export const loginUser = createAsyncThunk("/auth/login" , async ( formData : ReqLoginFormT, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, formData , {withCredentials : true});
        return response.data
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const logoutUser = createAsyncThunk("/auth/logout" , async (_, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout` , {withCredentials : true});
        return response.data
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const checkAuthenticated = createAsyncThunk("/auth/check-auth" , async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/auth/check-auth` , {withCredentials : true,         headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },});
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
            state.isAuthenticated  = null
            state.error = action.error.message || "Register Failed! Please try again"
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled , (state , action) => {
            // console.log(action , "user login check")
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated  = action.payload.success
        })
        .addCase(loginUser.rejected , (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = null
            state.error = action.error.message || "Login Failed! Please try again"
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logoutUser.fulfilled , (state , action) => {
            state.isLoading = false;
            state.user = action.payload.success && null;
            state.isAuthenticated  = null
        })
        .addCase(logoutUser.rejected , (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = null
            state.error = action.error.message || "Logout Failed! Please try again"
        })
        .addCase(checkAuthenticated.pending, (state) => {
            state.isLoading = true
        })
        .addCase(checkAuthenticated.fulfilled , (state , action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated  = action.payload.success
        })
        .addCase(checkAuthenticated.rejected , (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated  = null
            state.error = action.error.message || "Please try again"
        })
    },
})

export const {setUser} = authSlice.actions

export default authSlice.reducer


