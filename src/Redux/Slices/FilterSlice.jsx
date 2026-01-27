import {  createSlice } from "@reduxjs/toolkit";
const FilterSlice = createSlice({
    name: "Filter",
    initialState: {
        filterModel: null,
        columnVisibility:null
    },
    reducers: {
        setFilterModel: (state, action) => {
            state.filterModel = action.payload;
        },
        setColumnVisibility:(state,action)=>{
            state.columnVisibility = action.payload;
        }
    },
});

export const { setFilterModel,setColumnVisibility } = FilterSlice.actions;
export default FilterSlice.reducer;