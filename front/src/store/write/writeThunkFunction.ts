import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk(
  "write/getPost",
  async (postId, thunkAPI) => {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/post/${postId}`,
      );
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  },
);

// export const updatePost = createAsyncThunk(
//   "write/updatePost",
//   async (_, thunkAPI) => {
//     try {
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   },
// );
