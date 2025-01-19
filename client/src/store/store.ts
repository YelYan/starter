import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice/authSlice'
import adminProductReducer from './adminSlice/productSlice/productSlice'
import searchProductReducer from './searchSlice/searchSlice'
import shopProductReducer from "./shopSlice/productSlice/shopProductSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProduct :adminProductReducer,
        searchProduct : searchProductReducer,
        shopProductFilter : shopProductReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

