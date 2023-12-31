import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";
import axios from "axios";

export const postCategory = createAsyncThunk(
  "category/postCategory",
  async (categoryName: string, thunkAPI) => {
    try {
      let { data } = await axiosInstance.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/category`,
        { categoryName },
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/category`,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryName: string, thunkAPI) => {
    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_SERVER_DOMAIN}/category`,
        {
          data: {
            categoryName,
          },
        },
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);
