import { createSlice } from "@reduxjs/toolkit";

export const LoadingBackDrop = createSlice({
    name: 'loading',
    initialState: {
        show: false
    },
    reducers:{
        showLoadingBackDrop: (state) => { state.show = true },
        hideLoadingBackDrop: (state) => { state.show = false },
    },
});

export const { showLoadingBackDrop, hideLoadingBackDrop } = LoadingBackDrop.actions;

export default LoadingBackDrop.reducer;