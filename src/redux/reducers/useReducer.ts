import {createSlice} from "@reduxjs/toolkit";

const jwtToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGVkcm8iLCJqdGkiOiJkZDljMWNmNi0zYTJiLTRiZmUtYTcxNC1mZDA3N2RiMDVjM2IiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwZWRyb0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzIyMTY1MTU4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.EqVGU7UeBy23iYrG_UgdPygTERWFAx_-SOoC3gVFcaY";
const userId: string = "1"

const slice = createSlice({
    name: 'user',
    initialState:{
        token: jwtToken,
        userId,
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