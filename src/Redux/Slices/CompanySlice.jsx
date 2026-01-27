import {  createSlice } from "@reduxjs/toolkit";
const CompanySlice = createSlice({
    name: "Company",
    initialState: {
        company: null
    },
    reducers: {
        setCompany: (state, action) => {
            state.company = action.payload;
        },
        
    },
});

export const { setCompany } = CompanySlice.actions;
export default CompanySlice.reducer;