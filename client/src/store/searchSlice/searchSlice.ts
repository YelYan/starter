import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/config/api";
import axios from "axios";
import { ResProductT } from "@/types/products";

type SearchT = {
    isLoading : boolean;
    searchResult : ResProductT[],
    pagination? :{
        totalProducts: number,
        totalPages: number,
        currentPage: number,
        limit: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean
    }
    error? : string | null
}

const initialState : SearchT = {
    isLoading : false,
    searchResult : [],
    error : null
}

type SearchQueryT = Record<"query" | "page" | "limit" , string>

export  const searchProducts = createAsyncThunk("/shop/search" , async({ query, page, limit} :SearchQueryT, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/shop/search?q=${query}&page=${page}&limit=${limit}` , {withCredentials : true});
        return response.data
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.message || "Error while searching! Please try again")
    }
})

export const searchSlice = createSlice({
    name : "shop/search",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResult = action?.payload?.success ? action?.payload?.data : []
            state.pagination = action?.payload?.success ? action?.payload?.pagination : {}
        }) 
        .addCase(searchProducts.rejected , (state, action) => {
            state.isLoading = false;
            state.searchResult = [];
            state.error = action?.error ? action?.error?.message : "Some error occured!"
        })
    }
})


export default searchSlice.reducer
