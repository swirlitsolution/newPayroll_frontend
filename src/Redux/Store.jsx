import { configureStore } from "@reduxjs/toolkit";
import FilterSliceReducer from "./Slices/FilterSlice";
import CompanySliceReducer from "./Slices/CompanySlice"
import EmpSlice from "./Slices/EmpSlice"
import SiteSliceReducer from "./Slices/SiteSlice"
const store = configureStore({
    reducer: {
        // Add your slices here
        filter:FilterSliceReducer,
        Company:CompanySliceReducer,
        Employee:EmpSlice,
        Site:SiteSliceReducer
    },
    devTools: true
});

export default store;