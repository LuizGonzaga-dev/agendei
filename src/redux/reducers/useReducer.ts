import {createSlice} from "@reduxjs/toolkit";

//const jwtToken: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGVkcm8iLCJqdGkiOiJiNGZlMzgxMy05Njc5LTRhMjctYTAyNi04NTFhOWQ3MWYyY2QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwZWRyb0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzIyNTM1Mzg0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.Vlh--llQ8or84Gx19v7EALe-oXpSXJosGRVTsLZ_shU";
// const jwtToken = '';

const slice = createSlice({
    name: 'user',
    initialState:{
        token: '',
        name: '',
        validTo: Date
    },
    reducers:{
        setToken: (state, action) => {
            state.token = `Bearer ${action.payload}`;
        },
        setValidTo: (state, action) => {
            state.validTo = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const {setName, setToken, setValidTo} = slice.actions;
export default slice.reducer;