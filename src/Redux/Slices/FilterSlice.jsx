import {  createSlice } from "@reduxjs/toolkit";
const FilterSlice = createSlice({
    name: "Filter",
    initialState: {
        filterModel: null
    },
    reducers: {
        setFilterModel: (state, action) => {
            state.filterModel = action.payload;
        }
    },
});

export const { setFilterModel } = FilterSlice.actions;
export default FilterSlice.reducer;