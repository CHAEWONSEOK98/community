import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        formData,
        { withCredentials: true },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/logout`,

        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/user/update/${userId}`,
        formData,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/${userId}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);
