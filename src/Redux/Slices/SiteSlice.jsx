import {  createSlice } from "@reduxjs/toolkit";
const SiteSlice = createSlice({
    name: "Site",
    initialState: {
        site: null
    },
    reducers: {
        setSite: (state, action) => {
            state.site = action.payload;
        },
        
    },
});

export const { setSite } = SiteSlice.actions;
export default SiteSlice.reducer;