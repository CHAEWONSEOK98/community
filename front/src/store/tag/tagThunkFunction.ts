import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTags = createAsyncThunk("tag/getTags", async (_, thunkAPI) => {
  try {
    let { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/tag`);

    let arr: string[] = [];
    let brr = [];

    let lengthFilter = data.filter((item) => item.tags.length > 0);

    for (let i = 0; i < lengthFilter.length; i++) {
      for (let j = 0; j < lengthFilter[i].tags.length; j++) {
        if (!arr.includes(lengthFilter[i].tags[j])) {
          arr.push(lengthFilter[i].tags[j]);
          brr.push([lengthFilter[i].tags[j], 0]);
        } else {
          let dupIndex = arr.indexOf(lengthFilter[i].tags[j]);
          brr[dupIndex][1]++;
        }
      }
    }

    return brr;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});
