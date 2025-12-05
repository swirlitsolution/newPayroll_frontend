import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    employee: [],


}


export const getAllEmployee = createAsyncThunk("/employee/get", async () => {
    try {
        
        const response = axios.get("master/employee/");
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});