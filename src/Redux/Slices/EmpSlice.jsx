import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const EmpSlice = createSlice({
    name: "Employee",
    initialState: {
        SelectedEmployee: null,
        show:false
    },
    reducers: {
        setSelectedEmployee: (state, action) => {
            state.SelectedEmployee = action.payload;
        },
        setShow:(state,action) => {
            state.show = action.payload
        }
        
    },
});

export const { setSelectedEmployee,setShow } = EmpSlice.actions;
export default EmpSlice.reducer;

// export const getAllEmployee = createAsyncThunk("/employee/get", async () => {
//     try {
        
//         const response = axios.get("master/employee/");
//         return (await response).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// });