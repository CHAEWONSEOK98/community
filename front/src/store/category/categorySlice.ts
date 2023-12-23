import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCategory,
  getCategories,
  postCategory,
} from "./categoryThunkFunction";

interface initialState {
  categories: [
    {
      _id: string;
      categoryName: string;
      createdAt: string;
      __v: number;
    },
  ];
  loading: boolean;
  error: string | string[];
  trigger: boolean;
}

const initialState: initialState = {
  categories: [{}],
  loading: false,
  error: "",
  trigger: false,
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

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.loading = false;
      state.trigger = !state.trigger;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
