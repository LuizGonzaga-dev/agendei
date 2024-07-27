import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState:{
        token: '',
        userId: '',
        name: ''
    },
    reducers:{
        setToken: (state, action) => {
            state.name = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const {setName, setToken, setUserId} = slice.actions;
export default slice.reducer;