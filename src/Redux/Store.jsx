import { configureStore } from "@reduxjs/toolkit";
import FilterSliceReducer from "./Slices/FilterSlice";
import CompanySliceReducer from "./Slices/CompanySlice"
const store = configureStore({
    reducer: {
        // Add your slices here
        filter:FilterSliceReducer,
        Company:CompanySliceReducer,
    },
    devTools: true
});

export default store;