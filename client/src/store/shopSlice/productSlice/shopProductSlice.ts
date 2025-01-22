import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/config/api";
import axios from "axios";
import { ResProductT , FilterDataT} from "@/types/products";

type intialStateT = {
    isLoading : boolean;
    productFilterList : ResProductT[]
    error? : string | null
}

const initialState : intialStateT= {
    isLoading : false,
    productFilterList : [],
    error : null
}


export const fetchFilterProducts = createAsyncThunk("/shop/products/filter" , async (filterData : FilterDataT & {
    sortBy? : string
}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/shop/products/filter`, filterData  , {withCredentials : true})
        return response?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return rejectWithValue(error?.response?.data?.error || "Something went wrong!")
    }
})


export const shopProductSlice = createSlice({
    name : "shopProductSlice",
    initialState,
    reducers : {},
    extraReducers  (builder)  {
        builder.addCase(fetchFilterProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchFilterProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productFilterList = action?.payload?.success ? action?.payload?.data : [];
            state.error = null
        })  
        builder.addCase(fetchFilterProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productFilterList = [];
            state.error = action?.error?.message || "Some error occured!"
        })
    }
})

export default shopProductSlice.reducer