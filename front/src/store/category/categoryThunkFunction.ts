import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";

export const postCategory = createAsyncThunk(
  "category/postCategory",
  async (categoryName, thunkAPI) => {
    try {
      let { data } = await axiosInstance.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/category`,
        { categoryName },
      );
      console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);
