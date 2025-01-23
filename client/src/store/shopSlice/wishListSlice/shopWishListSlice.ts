import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResProductT } from "@/types/products";
import axios from "axios";
import { API_URL } from "@/config/api";

type WishListInitialStateT = {
    isLoading : boolean;
    wishList : {
        '_id' ?: string;
        user? : string
        products : ResProductT[]
    }
    error? : null | string
}

const initialState : WishListInitialStateT = {
    isLoading : false,
    wishList : {
        products : []
    },
    error : null
}


export const addWishList = createAsyncThunk("/shop/wishlist/add" , async (productId : string | undefined, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/shop/wishList/add` , {productId} , {withCredentials : true})
        return response?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const removeWishList = createAsyncThunk("/shop/wishlist/remove" , async (productId : string | undefined , {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/shop/wishList/remove` , {productId} , {withCredentials : true})
        return response?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})
export const getWishList = createAsyncThunk("/shop/wishlist/get" , async (_ , {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/shop/wishList/get`  , {withCredentials : true})
        return response?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Something went wrong!")
    }
})

export const shopWishListSlice = createSlice({
    name : "shopwishListSlice",
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(getWishList.pending, (state) => {
            state.isLoading = true
        }) 
        .addCase(getWishList.fulfilled , (state , action) => {
            state.isLoading = false;
            state.wishList = action?.payload?.success ? action?.payload?.wishList : {}
        })
        .addCase(getWishList.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action?.error?.message || "Some error occured!"
        })
    },
})

export default shopWishListSlice.reducer