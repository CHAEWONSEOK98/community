import { createSlice } from "@reduxjs/toolkit";
import { getCategories, postCategory } from "./categoryThunkFunction";

interface initialState {
  category: string;
  loading: boolean;
  error: string | string[];
}

const initialState = {
  categories: [],
  loading: false,
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
    });
    builder.addCase(postCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
