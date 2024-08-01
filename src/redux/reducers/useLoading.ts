import { createSlice } from "@reduxjs/toolkit";

export const LoadingBackDrop = createSlice({
    name: 'loading',
    initialState: false,
    reducers:{
        showLoadingBackDrop: (state) => true,
        hideLoadingBackDrop: (state) => false,
    },
});

export const { showLoadingBackDrop, hideLoadingBackDrop } = LoadingBackDrop.actions;

export default LoadingBackDrop.reducer;